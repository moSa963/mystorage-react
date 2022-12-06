import React from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { praseTime } from "../../utilities";
import FileIcon from "./FileIcon";


const FilesTableRow = ({ item, type, group_id, selected, onDoubleClick, setSelected, onFileRightClick }) => {

    const handleMouseUp = (e) => {
        if (e.button === 2 && e.currentTarget === e.target) {
            onFileRightClick && onFileRightClick(e, item, type);
        }
    }

    return (
        <TableRow vocab="" selected={selected}
            hover
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer" }}
            onDoubleClick={(e) => onDoubleClick(item, type)}
            onClick={() => setSelected({ item: item, type: type })}
            onMouseUp={handleMouseUp} 
        >
            <TableCell size="small" component="th" scope="row" width={75}><FileIcon file={item} group_id={group_id} type={type} /></TableCell>
            <TableCell size="small" align="center">{item?.name || "-"}</TableCell>
            {item?.original_location && <TableCell size="small" align="center">{item.original_location}</TableCell>}
            <TableCell size="small" align="center">{item?.extension || type}</TableCell>
            <TableCell size="small" align="center">{item?.mime_type || "-"}</TableCell>
            <TableCell size="small" align="center">{item?.size || "-"}</TableCell>
            <TableCell size="small" align="center">{praseTime(item?.created_at) || "-"}</TableCell>
            <TableCell size="small" align="center">{praseTime(item?.updated_at) || "-"}</TableCell>
        </TableRow>
    );
}


export default FilesTableRow;