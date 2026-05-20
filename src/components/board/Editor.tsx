import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const Editor = ({ value, onChange, placeholder }: EditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return;

    const quill = new Quill(containerRef.current, {
      theme: 'snow',
      placeholder: placeholder || 'Add description...',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'blockquote', 'code-block'],
          ['clean'],
        ],
      },
    });

    quillRef.current = quill;

    quill.on('text-change', () => {
      const html = quill.root.innerHTML;
      onChange(html);
    });

    // Initial value
    if (value) {
      quill.root.innerHTML = value;
    }
  }, [onChange, placeholder]);

  // Update value from outside if needed (but avoid loop)
  useEffect(() => {
    if (quillRef.current && isInitialRender.current && value) {
      quillRef.current.root.innerHTML = value;
      isInitialRender.current = false;
    }
  }, [value]);

  return (
    <div className="linear-quill-wrapper bg-transparent">
      <div ref={containerRef} />
    </div>
  );
};

export default Editor;
