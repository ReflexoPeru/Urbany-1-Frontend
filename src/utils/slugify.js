const removeDiacritics = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const slugify = (value) => {
    if (!value) {
        return 'sin-identificador';
    }
    const normalized = removeDiacritics(String(value).toLowerCase());
    const slug = normalized.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return slug || 'sin-identificador';
};

export default slugify;


