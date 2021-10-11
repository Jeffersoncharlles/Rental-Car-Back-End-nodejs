import fs from 'fs';

const deleteFile = async (file: string) => {
    try {
        await fs.promises.stat(file);
        //* verifica se o arquivo existe
    } catch {
        return;
    }

    await fs.promises.unlink(file);
    //* remove se o arquivo existe
};

export { deleteFile };
