import styled, {keyframes} from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  fieldset {
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(to right, #ba00ff 0%, #e7a8fe 50%, #ba00ff 100%);
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export default Form;
