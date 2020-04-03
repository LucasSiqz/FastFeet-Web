import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { MdInsertPhoto } from 'react-icons/md';
import PropTypes from 'prop-types';

import api from '~/services/api';

import { Container, DefaultContent } from './styles';

export default function AvatarInput({ initialUrl }) {
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(null);

  const ref = useRef();

  useEffect(() => {
    if (initialUrl) {
      setPreview(initialUrl);
    }
  }, [initialUrl]);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref]); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {preview ? (
          <img src={preview} alt="preview" />
        ) : (
          <DefaultContent>
            <MdInsertPhoto size={40} color="#dddddd" />
            <strong>Adicionar foto</strong>
          </DefaultContent>
        )}

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

AvatarInput.propTypes = {
  initialUrl: PropTypes.string,
};

AvatarInput.defaultProps = {
  initialUrl: null,
};
