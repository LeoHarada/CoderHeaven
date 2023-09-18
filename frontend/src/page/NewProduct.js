import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

const NewProduct = () => {
    const [data, setData] = useState({
        name: "",
        category: "",
        image: "",
        price: "",
        description: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const uploadImage = async (e) => {
        const data = await ImagetoBase64(e.target.files[0]);
        console.log(data);
        setData((prev) => {
            return {
                ...prev,
                image: data,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, image, category, price } = data;

        if (name && image && category && price) {
            const fetchData = await fetch(
                `${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            const fetchRes = await fetchData.json();
            console.log(fetchRes);
            toast(fetchRes.message);
        } else {
            toast("Enter the required fields.");
        }
    };

    return (
        <div className="p-4">
            <form
                className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white"
                onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input
                    type={"text"}
                    name="name"
                    className="bg-slate-200 p-1 my-1"
                    onChange={handleOnChange}
                />

                <label htmlFor="category">Category</label>
                <select
                    className="bg-slate-200 p-1 my-1"
                    id="category"
                    name="category"
                    onChange={handleOnChange}
                >
                    <option value={"other"}>select category</option>
                    <option value={"chairs"}>Chairs</option>
                    <option value={"chargers"}>Chargers</option>
                    <option value={"fans"}>Fans</option>
                    <option value={"headphones"}>Headphones</option>
                    <option value={"humidifiers"}>Humidifiers</option>
                    <option value={"keyboards"}>Keyboards</option>
                    <option value={"microphones"}>Microphones</option>
                    <option value={"monitors"}>Monitors</option>
                    <option value={"mouses"}>Mouses</option>
                    <option value={"mousepads"}>Mousepads</option>
                    <option value={"speakers"}>Speakers</option>
                    <option value={"stands"}>Stands</option>
                    <option value={"timers"}>Timers</option>
                    <option value={"trays"}>Trays</option>
                    <option value={"webcams"}>Webcams</option>
                </select>
                <label htmlFor="image">
                    Image
                    <div className="h-40 w-full bg-slate-300 rounded flex items-center justify-center cursor-pointer">
                        {data.image ? (
                            <img src={data.image} className="h-full" />
                        ) : (
                            <span className="text-5xl">
                                <BsCloudUpload />
                            </span>
                        )}

                        <input
                            type={"file"}
                            accept="image/*"
                            id="image"
                            onChange={uploadImage}
                            className="hidden"
                        />
                    </div>
                </label>

                <label htmlFor="price" className="my-1">
                    Price
                </label>
                <input
                    type={"text"}
                    className="bg-slate-200 p-1 my-1"
                    name="price"
                    onChange={handleOnChange}
                />

                <label htmlFor="description" className="my-1">
                    Description
                </label>
                <textarea
                    rows={3}
                    className="bg-slate-200 p-1 my-1 resize-none"
                    name="description"
                    onChange={handleOnChange}
                />

                <button className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow">
                    Save
                </button>
            </form>
        </div>
    );
};

export default NewProduct;
