import React, { createContext } from "react";
import { splitr } from "../../utilities";
import UploadCard from "./UploadCard";

const Context = createContext();

const UploadProvider = ({ children }) => {
    const [files, setFiles] = React.useState([]);
    const [uploaded, setUploaded] = React.useState([]);

    const pushFiles = (newFiles = {}, directory_id) => {
        setFiles(of => {

            const nf = Object.values(newFiles).map(e => {
                const [name, ext] = splitr(e.name, '.');

                return { 
                    id: Date.now() + "_id_" + (Math.random() * 200),
                    file: e,
                    name: name, 
                    extension: ext, 
                    directory_id: directory_id 
                };
            });

            return [...of, ...nf];
        });
    }

    return (
        <Context.Provider value={[uploaded, pushFiles]}>
            {children}
            { files.length > 0 && <UploadCard files={files} setFiles={setFiles} setUploaded={setUploaded}/> }
        </Context.Provider>
    );
}

export default UploadProvider;

export function useUpload() { return React.useContext(Context) };