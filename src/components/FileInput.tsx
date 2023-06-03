// import React from 'react';
// import { Control, Controller } from 'react-hook-form';
// import Dropzone from 'react-dropzone'

// type FileInputProps = {
// 	control: any,
// 	name: string,
// }

// const FileInput: React.FC<FileInputProps> = ({control, name}) => {
// 	return <Controller control={control} name={name} render={({onChange, onBlur,value}) => <>
// 		<Dropzone  onDrop={onChange}>
// 			{
// 				({getRootProps, getInputProps}) => <div {...getRootProps()}>
// 					<input name={name} onBlur={onBlur} {...getInputProps()} type="text" />
// 					<p>Drag 'n' drop files here, or click to select files</p>
// 				</div>
// 			}
// 		</Dropzone>
// 		<div>
// 			{value.map((f, index) => <span key={index}>f.name</span>)}
// 		</div>
// 	</>}>;
// };

// export default FileInput;
