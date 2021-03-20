const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadPhoto = (element1, element2) => {
  element1.addEventListener('change', () => {
    const file = element1.files[0];
    const fileName = file.name.toLowerCase();

    const isValidImageType = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (isValidImageType) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        element2.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
}

export { uploadPhoto };
