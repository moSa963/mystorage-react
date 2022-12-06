import { deleteFile, emptyBin, getBinFiles, restoreBinItem } from "../../http/Data";

export const loadFiles = async (setFiles, setProcessing, nav) => {
    setProcessing(true);

    const res = await getBinFiles();
    const js = await res.json();

    if (res.ok) {
        setFiles(js.data);
        setProcessing(false);
        return;
    }
    nav('/error/' + res.status + '/' + res.statusText);

}


export const handleDelete = async (file, setFiles, setDialogCard, setMessage) => {
    setDialogCard({
        message: `Do you want to delete this file?`,
        action: async () => {
            const res = await  deleteFile(file.group_id, file.id);

            if (res.ok){
                setFiles(f => f.filter(e => e.id !== file.id));
                setMessage(`file has been deleted sucessfully.`);
                return;
            }

            const js = await res.json();
            setMessage(js.message);
        },
    });
}

export const handleRestore = async (file, setFiles, setDialogCard, setMessage) => {
    setDialogCard({
        message: `Do you want to restore this file?`,
        action: async () => {
            const res = await  restoreBinItem(file.id);

            if (res.ok){
                setFiles(f => f.filter(e => e.id !== file.id));
                setMessage(`file has been restored sucessfully.`);
                return;
            }

            const js = await res.json();
            setMessage(js.message);
        },
    });
}

export const handleDeleteAll = async (setFiles, setDialogCard, setMessage) => {
    setDialogCard({
        message: `Do you want to delete all files?`,
        action: async () => {
            const res = await emptyBin();

            if (res.ok){
                setFiles([]);
                setMessage(`Bin has been emptied successfully.`);
                return;
            }

            const js = await res.json();
            setMessage(js.message);
        },
    });
}
