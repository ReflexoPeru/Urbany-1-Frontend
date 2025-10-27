import React from "react";
import styles from "./SocialLogin.module.css";

const SocialLogin = () => {
    const providers = [
        {
            name: "Apple",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn1TRltqzNicebAOcK_8t53eWwbFC-eQPUsw&s",
        },
        {
            name: "Google",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
        },
        {
            name: "Facebook",
            img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png",
        },
    ];

    return (
        <div className={styles.socials}>
            {providers.map((provider) => (
                <div key={provider.name} className={styles.social_icon}>
                    <img src={provider.img} alt={provider.name} />
                </div>
            ))}
        </div>
    );
};

export default SocialLogin;
