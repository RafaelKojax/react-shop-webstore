const BASE_URL = 'http://localhost:1337';

export const getFullImageUrl = (path?: string) => {
    if (!path) return 'http://via.placeholder.com/300x200?text=Sem+Imagem';
    return `${BASE_URL}${path}`;
};