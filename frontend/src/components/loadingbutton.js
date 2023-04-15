import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap/Spinner';

function LoadingButton(props) {
  const [isLoading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    // Perform the async operation
    props.onClick().then(() => {
      setLoading(false);
    });
  };

  return (
    <Button variant={props.variant} disabled={isLoading} onClick={!isLoading ? handleClick : null}>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        props.text
      )}
    </Button>
  );
}

export default LoadingButton;
