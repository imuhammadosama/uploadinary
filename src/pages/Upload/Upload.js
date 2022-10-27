import axios from 'axios';
import { useEffect, useState } from 'react';
import './Upload.css';

export default function Upload() {
  const [file, setFile] = useState(false);
  const [status, setStatus] = useState('Upload');

  const upload = (files, type) => {
    setStatus('Uploading...');
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'hsqe4h9m');

    axios
      .post('https://api.cloudinary.com/v1_1/dvwpbbisf/image/upload', formData)
      .then((Response) => {
        if (type === 'pic') {
          navigator.clipboard.writeText(
            Response.data.url
              .replace(/\.[^\/.]+$/, '')
              .replace('/upload/', '/upload/q_auto:eco/') + '.webp'
          );
          document.getElementById('file-input').value = '';
          setFile(false);
          showToast();
        }
      });
  };

  function showToast() {
    setStatus('Upload');
    var x = document.getElementById('toast');
    x.className = 'show';
    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, 3000);
  }

  useEffect(() => {
    const fileInput = document.getElementById('file-input');

    window.addEventListener('paste', (e) => {
      setFile(e.clipboardData.files);
      fileInput.files = e.clipboardData.files;
    });
  }, []);

  return (
    <div className='container'>
      <label className='upload-label'>
        <div className='upload-label-title'>
          <div className='upload-label-input'>
            <div className='upload-label-icon'>
              <svg
                width='40'
                height='40'
                viewBox='0 0 40 40'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M19.1117 2.08333H19.1667H20C20.6903 2.08333 21.25 2.64298 21.25 3.33333C21.25 4.02368 20.6903 4.58333 20 4.58333H19.1667C16.425 4.58333 14.4418 4.58425 12.8805 4.70832C11.3333 4.83127 10.3077 5.06928 9.46328 5.4857C7.73575 6.33762 6.3376 7.73577 5.48568 9.4633C5.06926 10.3077 4.83125 11.3333 4.7083 12.8805C4.58423 14.4418 4.58331 16.425 4.58331 19.1667V20.6667C4.58331 23.4875 4.58428 25.528 4.7154 27.1328C4.75258 27.5878 4.7997 27.9988 4.85835 28.3738L10.4002 22.832L10.4357 22.7965C11.0567 22.1755 11.5754 21.6568 12.0341 21.267C12.5127 20.8603 13.0061 20.5223 13.5989 20.3268C14.5093 20.0265 15.491 20.0193 16.4057 20.306C17.0013 20.4928 17.4997 20.8235 17.9843 21.223C18.4487 21.606 18.975 22.117 19.6052 22.7288L19.6412 22.7638L24.1305 27.1225L25.0315 26.2215L25.0673 26.1857H25.0675C25.6972 25.5558 26.2228 25.0302 26.6873 24.6358C27.1717 24.2247 27.6712 23.8833 28.2712 23.6883C29.1917 23.3893 30.1833 23.3893 31.1038 23.6883C31.7038 23.8833 32.2032 24.2245 32.6875 24.6357C33.1518 25.0298 33.6773 25.5553 34.3068 26.1848L34.3427 26.2207L35.288 27.166L35.2917 27.1195C35.4157 25.5582 35.4167 23.575 35.4167 20.8333V20C35.4167 19.3097 35.9763 18.75 36.6667 18.75C37.357 18.75 37.9167 19.3097 37.9167 20V20.8333V20.8882C37.9167 23.5635 37.9167 25.6457 37.7838 27.3175C37.649 29.0147 37.3713 30.3957 36.7565 31.6423C35.6612 33.8635 33.8635 35.6612 31.6423 36.7565C30.3957 37.3713 29.0147 37.649 27.3175 37.7838C25.6457 37.9167 23.5635 37.9167 20.8882 37.9167H20.8333H19.3333H19.2767H19.2765C16.5243 37.9167 14.382 37.9167 12.6636 37.7763C10.9187 37.6337 9.50106 37.3402 8.22591 36.6905C6.1091 35.6118 4.38806 33.8908 3.3095 31.774L3.27883 31.7133C3.04795 31.4803 2.92745 31.1793 2.91735 30.8752C2.53348 29.8337 2.33368 28.6825 2.22371 27.3365C2.0833 25.618 2.08331 23.4757 2.08331 20.7232V20.6667V19.1667V19.1117C2.08331 16.4366 2.0833 14.3543 2.21615 12.6825C2.35101 10.9853 2.62863 9.6044 3.2435 8.35758C4.33883 6.13647 6.13645 4.33885 8.35756 3.24352C9.60438 2.62865 10.9853 2.35103 12.6825 2.21617C14.3543 2.08332 16.4365 2.08333 19.1117 2.08333ZM9.3609 34.463C7.84438 33.6903 6.58905 32.4937 5.74481 31.023L12.1679 24.5998C12.8337 23.934 13.2809 23.4882 13.6529 23.172C14.0137 22.8655 14.2223 22.7537 14.382 22.701C14.7958 22.5645 15.242 22.5612 15.6578 22.6915C15.8183 22.7418 16.0285 22.8507 16.3937 23.1518C16.7705 23.4625 17.2242 23.9017 17.8997 24.5575L23.2662 29.7678L28.6087 35.1103C28.1697 35.1878 27.6787 35.2472 27.1195 35.2917C25.5582 35.4157 23.575 35.4167 20.8333 35.4167H19.3333C16.5124 35.4167 14.4719 35.4157 12.8671 35.2845C11.2769 35.1547 10.2249 34.9032 9.3609 34.463ZM34.5143 30.5367C33.7727 32.0407 32.617 33.2948 31.1905 34.1565L25.9113 28.8773L26.7993 27.9893C27.4742 27.3143 27.9278 26.862 28.3053 26.5417C28.6715 26.2308 28.8827 26.1183 29.0437 26.066C29.4622 25.93 29.9128 25.93 30.3313 26.066C30.4923 26.1183 30.7035 26.2308 31.0695 26.5415C31.4468 26.8617 31.9003 27.3138 32.5748 27.9885L34.7012 30.1148C34.6433 30.261 34.5812 30.4012 34.5143 30.5367ZM30.8838 4.11612C30.3957 3.62797 29.6043 3.62797 29.1162 4.11612L24.9495 8.28278C24.4613 8.77093 24.4613 9.5624 24.9495 10.0506C25.4377 10.5387 26.229 10.5387 26.7172 10.0506L28.75 8.01777V15C28.75 15.6904 29.3097 16.25 30 16.25C30.6903 16.25 31.25 15.6904 31.25 15V8.01777L33.2828 10.0506C33.771 10.5387 34.5623 10.5387 35.0505 10.0506C35.5387 9.5624 35.5387 8.77093 35.0505 8.28278L30.8838 4.11612Z'
                  fill='#22272F'
                />
              </svg>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div>Choose or Paste</div>
            </div>
          </div>
        </div>
        <input
          id='file-input'
          type='file'
          multiple
          accept='image/png, image/jpg, image/jpeg'
          onChange={(e) => {
            setFile(e.target.files);
            console.log(file);
          }}
        />
        <img
          className='image'
          src={
            file
              ? URL.createObjectURL(file[0])
              : 'http://res.cloudinary.com/dvwpbbisf/image/upload/q_auto:eco/v1662211159/cfcrzb6wuqrbgmvzz6ee.webp'
          }
          height='150px'
        />
        <div className='file-name'>{file ? file[0].name : 'Filename'}</div>
      </label>

      {status === 'Uploading...' ? (
        <button disabled={true} className='upload-button'>
          {status}
        </button>
      ) : (
        <button
          onClick={() => {
            upload(file, 'pic');
          }}
          disabled={file ? false : true}
          className='upload-button'
        >
          {status}
        </button>
      )}
      <div id='toast'>Uploaded & Link Copied!</div>
    </div>
  );
}
