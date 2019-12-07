import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const toolBarOptions = {
  options: ['inline', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history'],
  list: {
    options: ['unordered', 'ordered'],
  },
};

const Wysiwyg = (props) => {
  const { description, index, onChange, name, blockId } = props;
  const onDescriptionChange = (editorState) => {
    // eslint-disable-next-line no-use-before-define
    setEditorState(editorState);
    const rawHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const fakeEvent = {
      target: {
        getAttribute: (key) => {
          if (key === 'name') {
            return name;
          } if (key === 'data-block-id') {
            return blockId;
          }
          return null;
        },
        value: rawHtml,
      },
    };
    onChange(fakeEvent);
  };

  const contentBlock = htmlToDraft(description || '');
  let descriptionEditorState;
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    descriptionEditorState = EditorState.createWithContent(contentState);
  } else {
    descriptionEditorState = EditorState.createEmpty();
  }
  const [editorState, setEditorState] = useState(descriptionEditorState);


  return (
    <Editor
      editorState={editorState}
      toolbar={toolBarOptions}
      onEditorStateChange={onDescriptionChange}
    />
  );
};

Wysiwyg.defaultProps = {
  description: '',
  name: 'description',
  blockId: 0,
  onChange: () => {},
};

Wysiwyg.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  blockId: PropTypes.string,
  onChange: PropTypes.func,
};

export default Wysiwyg;
