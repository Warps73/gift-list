import styled from 'styled-components';

const Item = styled.article`
  max-height : 400px;
  overflow:hidden;
  background:white;
  width:15em;
  padding:2em;
  border-radius:1em;
  text-align:center;
  box-shadow:2px 2px 4px 2px rgba(0,0,0,0.5);
p{
  font-size:1.8rem;
}
h4{
  color:rgba(0,0,0,0.6);
}

button{
  font-size:1.5rem;
  padding:0.5em 1em;
  border-radius:0.5em;
  margin:-3em 0;
  transition:all 0.3s;
}
`;

export default Item;
