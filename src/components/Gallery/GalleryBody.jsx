import { useState } from 'react';
import AddImage from '../AddImage';
import PreviewImage from '../PreviewImage';
import AfterSelectHeader from '../AfterSelectHeader';
import { Images } from '../../data/ImageData';

const GalleryBody = () => {

    const [images, setImages] = useState(Images);
    const [draggedImage, setDraggedImage] = useState(null);
    const [draggedID, setDraggedID] = useState(null)
    const [selectedImages, setSelectedImages] = useState([]);



    // when a user click a image then data will be save  setSelectedImages
    const handleImageClick = (imageId) => {
        if (selectedImages.includes(imageId)) {
            setSelectedImages(selectedImages.filter((id) => id !== imageId));
        } else {
            setSelectedImages([...selectedImages, imageId]);
        }
    }

    const handleUnselect = () => {
        setSelectedImages([])
    }

    const handleDragStart = (e, image) => {
        e.dataTransfer.setData('imageId', image._id);
        setDraggedImage(image);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e?.target?.children[0]?.id && setDraggedID(e?.target?.children[0]?.id);

    }

    const handleDrop = (e, targetImage) => {
        e.preventDefault();
        const sourceImageId = e.dataTransfer.getData('imageId');
        const updatedImages = images.slice();
        const sourceIndex = images.findIndex((image) => image._id === sourceImageId);
        const targetIndex = images.findIndex((image) => image._id === targetImage._id);

        updatedImages.splice(sourceIndex, 1);
        updatedImages.splice(targetIndex, 0, draggedImage);

        setImages(updatedImages);
        setDraggedImage(null);
        setDraggedID(null)
    };

    const handleDelete = (e) => {
        e.preventDefault();
        const deleteItemFilter = images.filter(image => !selectedImages.includes(image._id))
        setImages(deleteItemFilter);
        setSelectedImages([])
    }


    return (
        <>
            {/* Top of the gallery */}
            <div>
                {selectedImages.length === 0 ? 
                <p className='text-xl font-bold p-5 flex items-center'>Gallery</p>
                    :
                    <AfterSelectHeader handleUnselect={handleUnselect} selectedImages={selectedImages} handleDelete={handleDelete} />
                }
            </div>
            <div className="divider rounded-lg border-4 h-2 mb-"></div>

            {/* Body of the gallery */}


            <div onDragOver={handleDragOver} className="gallery-body">
                {images?.map((image) => (
                    <div
                        className="gallery-item relative"
                        key={image._id}

                        onDrop={(e) => handleDrop(e, image)}
                    >
                        <div
                            className='w-full h-full'
                            draggable="true"
                            onDragStart={(e) => handleDragStart(e, image)}>

                            <img
                                src={image.image}
                                className={` hover:opacity-[0.5] w-full h-full rounded duration-300 bg-white`}
                                alt={`Image ${image._id}`}

                            />

                            <div className='absolute w-full h-full bg-black top-0 left-0 opacity-0  hover:opacity-50 duration-300 cursor-move'>
                                <input checked={false} readOnly onClick={() => handleImageClick(image._id)} className='h-5 w-5 ml-5 mt-5 cursor-pointer' type="checkbox" name="checkbox" id={image._id} />
                            </div>

                            {/* when drag start a image then user can see preview  */}
                            {draggedID == image._id && <PreviewImage draggedImage={draggedImage} />}
                        </div>
                        {selectedImages.includes(image._id) && (
                            <div
                                className={` absolute w-full h-full bg-black top-0 left-0 opacity-30 cursor-auto`}>
                                <input id={image._id} defaultChecked onClick={() => handleImageClick(image._id)} className='h-5 w-5 ml-5 mt-5 cursor-pointer' type="checkbox" name="checkbox2" />
                            </div>
                        )}
                    </div>
                ))}


                <AddImage setImages={setImages} images={images} />
            </div>
        </>
    );
};

export default GalleryBody;