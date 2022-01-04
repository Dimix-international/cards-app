import React from "react";
import s from "./AddEditCardModal.module.scss";
import {FileType} from "./AddEditCardModal";

type ImgVideoAudioType = {
    file: FileType
}
export const ImgVideoAudio: React.FC<ImgVideoAudioType> = React.memo(props => {

    const {file} = props;

    return (
        <>
            {
                file &&
                (file.type === 'image/jpeg'
                    || file.type === 'image/png'
                    || file.type === 'image/svg+xml'
                )
                    ? <div className={s.file}>
                        <img
                            src={file.name}
                            alt=""
                        />
                    </div>
                    : file.type === 'video/webm'
                    || file.type === 'video/mp4'
                    || file.type === 'video/ogg'
                    ? <div className={s.file}>
                        <video preload="metadata" controls>
                            <source
                                type={file.type}
                                src={file.name}/>
                        </video>
                    </div>
                    : false
            }
        </>
    )
})