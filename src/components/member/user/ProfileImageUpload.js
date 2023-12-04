import React, {useState} from 'react';

function ProfileImageUpload() {
    const [buttonImage, setButtonImage] = useState("https://demos.wrappixel.com/premium-admin-templates/angular/flexy-angular/dark/assets/images/users/user2.jpg");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setButtonImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <label>
            <input
                type="file"
                style={{display: 'none'}}
                onChange={handleImageChange}
                accept="image/*"
            />
            <img
                src={buttonImage}
                alt="Upload Button"
                className="image_upload_btn"
            />
        </label>
    );
}

export default ProfileImageUpload;