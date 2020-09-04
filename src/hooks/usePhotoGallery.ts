import {useEffect, useState} from "react";
import {useCamera} from '@ionic/react-hooks/camera';
import {base64FromPath, useFilesystem} from '@ionic/react-hooks/filesystem';
import {CameraPhoto, CameraResultType, CameraSource, Capacitor, FilesystemDirectory} from "@capacitor/core";
import {useStorage} from "@ionic/react-hooks/storage";
import {isPlatform} from "@ionic/react";
import ReactGA from "utilities/analytics";

export interface Photo {
  filepath: string;
  webviewPath?: string;
  base64?: string;
}

const PHOTO_STORAGE = "photos";
export function usePhotoGallery() {
  const [ photos, setPhotos ] = useState<Photo[]>([]);
  const { deleteFile, readFile, writeFile } = useFilesystem();
  const { get, set } = useStorage();
  const { getPhoto } = useCamera();

  useEffect(() => {
    const loadSaved = async () => {
      const photosString = await get(PHOTO_STORAGE);
      const photos = (photosString ? JSON.parse(photosString) : []) as Photo[];

      if (!isPlatform("hybrid")) {
        for (let photo of photos) {
          const file = await readFile({
            path: photo.filepath,
            directory: FilesystemDirectory.Data
          });
          photo.base64 = `data:image/jpeg;base64,${file.data}`;
        }
      }
      setPhotos(photos);
    };

    loadSaved();
  }, [get, readFile]);

  const takePhoto = async () => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const fileName = new Date().getTime() + '.jpeg';
    const savedFileImage = await savePicture(cameraPhoto, fileName);
    const newPhotos = [savedFileImage, ...photos];
    setPhotos(newPhotos);

    ReactGA.event({category: "Photo", action: "Took a photo", label: fileName});

    set(PHOTO_STORAGE, isPlatform("hybrid")
      ? JSON.stringify(newPhotos)
      : JSON.stringify(newPhotos.map(p => {
        // Don't save the base64 representation of the photo data,
        // since it's already saved on the Filesystem
        const photoCopy = { ...p };
        delete photoCopy.base64;
        return photoCopy;
      }))
    );
  };

  const savePicture = async (photo: CameraPhoto, fileName: string): Promise<Photo> => {
    let base64Data: string;
    if (isPlatform('hybrid')) {
      const file = await readFile({
        path: photo.path!
      });
      base64Data = file.data;
    } else {
      base64Data = await base64FromPath(photo.webPath!);
    }

    const savedFile = await writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    if (isPlatform('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri)
      }
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath
      }
    }
  };

  const deletePhoto = async (photo: Photo) => {
    // Remove this photo from the Photos reference data array
    const newPhotos = photos.filter(p => p.filepath !== photo.filepath);

    // Update photos array cache by overwriting the existing photo array
    set(PHOTO_STORAGE, JSON.stringify(newPhotos));

    // delete photo file from filesystem
    const fileName = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await deleteFile({
      path: fileName,
      directory: FilesystemDirectory.Data
    });
    setPhotos(newPhotos);

    ReactGA.event({category: "Photo", action: "Deleted a photo", label: fileName});
  };

  return {
    deletePhoto,
    photos,
    takePhoto
  };
}