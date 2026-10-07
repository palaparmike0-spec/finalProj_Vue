const MAX_IMAGE_SIZE = 1024 * 1024

export function readProductImage(file) {
    if (!file) return Promise.resolve('')
    if (!file.type.startsWith('image/')) {
        return Promise.reject(new Error('Choose an image file such as JPG, PNG, or WEBP.'))
    }
    if (file.size > MAX_IMAGE_SIZE) {
        return Promise.reject(new Error('Choose an image smaller than 1 MB.'))
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result)
            } else {
                reject(new Error('The image could not be read. Choose another file and try again.'))
            }
        }
        reader.onerror = () => reject(new Error('The image could not be read. Choose another file and try again.'))
        reader.readAsDataURL(file)
    })
}
