import React from 'react';

export const AboutUsPage = () => {
  return (
    <>
      <div className='register-bar'>
        <div className='register-logo'></div>
        <div className='register-title'> About Us</div>
      </div>
      <div className='page-content'>
        <div className='titulo-about-us'>
            <h2>"Ustedes son nuestro grupo Favorito"</h2>
            <p className='letras-chicas'>Rebeca Obando & Alexandra Martínez 2022</p>
        </div>
        <div className='div-foto'>
            <img className='foto-grupal' src='https://pin-play-ci0137.s3.amazonaws.com/FotoPIMAMADISIMOS.jpeg' alt='img'></img>
        </div>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer> 
    </>
  )
}
