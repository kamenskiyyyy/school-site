import {CKEditor} from 'ckeditor4-react';
import {useState} from "react";

function ConfigEvents() {
  let [data, setData] = useState();

  function handleChange(e) {
    setData(e.editor.getData())
  }

  return (
    <>
      <h2>Редактирование статьи</h2>
      <CKEditor
        initData={data}
        data={data}
        config={{
          language: 'ru',
          width: '80vw'
        }}
        onChange={handleChange}
      />
      <div className="editor-preview">
        <h2>Предпросмотр</h2>
        <div dangerouslySetInnerHTML={{__html: data}}/>
      </div>
    </>
  );
}

export default ConfigEvents;
