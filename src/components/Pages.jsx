import React, { useState, useEffect } from 'react';
import logo1 from '../utility/logo1.png';
import './style.css';

const Pages = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [imagesData, setImagesData] = useState([]);
  // const [sourceData , setSourceData] = useState([])

  useEffect(() => {
    fetchImages();
  }, [search]);

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  const accessKey = '32YsgW7ZOLbbUrSVfiHVWenOvs4mo4rmJYgg4xaJyc4';

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${search}`,
        {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        }
      );

      const data = await response.json();
      setImagesData(data.results); 
      // setSourceData(data.result)// Use 'data.results' to get the array of images from the API response
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  const submitHandler = () => {
    console.log('Search query:', search);
    setSearch('');
  };

  return (
    <div>
      <div>
        <img src={logo1} alt="logo" className="logo-details" />
      </div>

      <div className="search-details">
        <input
          type="text"
          value={search}
          onChange={searchHandler}
          placeholder="Search here"
          className="input-details"
        />
        <button type="submit" className="butn" onClick={submitHandler}>
          Submit
        </button>
      </div>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="image-container">
          {Array.isArray(imagesData) && imagesData.length > 0 ? (
            imagesData.map((image) => (
              <div key={image.id} className="image-wrapper">
                <img src={image.urls.small} alt={image.alt_description} className='fetches-img-details' />

                 <div className='image-tooltip'>
                    <p>{image.created_at}</p>
                    <p>{image.description} </p>  
                    <p>{image.alt_description}</p>
                 </div>
              </div>
            ))
          ) : (
           
            <p className='empty-display'>
              The provided code includes a search bar that allows users to enter a query to search for images. When the user submits the query, the code fetches images related to the search query from the Unsplash API. The fetched images are displayed on the page in a grid format. When the user hovers over an image, 
              the image's description and created date & time is shown in a tooltip-like box. This allows users to easily find and view images based on their search queries.
            </p>
          )}
        </div>
      )}
    </div>
  );
};


export default Pages;
