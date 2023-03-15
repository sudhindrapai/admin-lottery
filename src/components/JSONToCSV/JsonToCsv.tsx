import {FC} from 'react'
import Papa from 'papaparse';
import Button from '../UI/Button/Button'
interface ParseToCsvProps{
    data: any,
    fileLabel:string
}

enum ButtonSize {
    sm = "small",
    md = "medium",
    lg = "large"
}
enum ButtonVariant {
    primaryFilled = "primary-filled",
    secondary = "secondary",
    primaryLink = "primaryLink"
}

const ParseToCsv:FC<ParseToCsvProps> = ({data,fileLabel}):JSX.Element => {

    const convertToBlobLink = () => {
        let csvData = Papa.unparse(data);
        let blob = new Blob([csvData], {type: 'text/csv'});
        let url = window.URL.createObjectURL(blob);
        downloadToCsv(url)
    };

    const downloadToCsv = (blobUrl:any) => {
        let dateObj = new Date();
        let link = document.createElement('a');
        let dateString = `${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
        link.download = `kings_ring_admin_export_${fileLabel}_${dateString}_${dateObj.getTime()}`;
        link.href = blobUrl;
        link.click();
    }

    return <Button title={"EXPORT"} 
    btnSize={ButtonSize.md} btnVariant={ButtonVariant.primaryFilled} 
    clicked={convertToBlobLink} />
};

export default ParseToCsv