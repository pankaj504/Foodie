import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResult from './components/searchresult/SearchResult';
export const BASE_URL = 'http://localhost:9000';
function App() {
  const [data, setData] = useState(null);
  const [filterData, setFilterdata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedBtn, setSelectedBtn] = useState('all');

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);

      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilterdata(json);
        setLoading(false);
      } catch (error) {
        setError('Unable To Fetch Data');
      }
    };
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    if (searchValue == '') {
      setFilterdata(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilterdata(filter);
  };

  const filterFood = (type) => {
    if (type == 'all') {
      setFilterdata(data);
      setSelectedBtn('all');
      return;
    }
    const filter = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()));
    setFilterdata(filter);
    setSelectedBtn(type);
  };

  const filterBtn = [
    {
      name: 'All',
      type: 'all',
    },

    {
      name: 'Breakfast',
      type: 'breakfast',
    },
    {
      name: 'Lunch',
      type: 'lunch',
    },
    {
      name: 'Dinner',
      type: 'dinner',
    },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading...</div>;
  return (
    //  initialize styled component
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/Foody Zone.png" alt="logo" />
          </div>
          <div className="search">
            <input onChange={searchFood} placeholder="Search Food" />
          </div>
        </TopContainer>
        <FilterContainer>
          {filterBtn.map((value) => 
            <Button
            isSelected={selectedBtn==value.type}
             key={value.name} onClick={() => filterFood(value.type)}>
              {value.name}
            </Button>
          )}

        
        </FilterContainer>
      </Container>
      <SearchResult data={filterData} />
    </>
  );
}

export default App;
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search input {
    background: transparent;
    border: 1px solid red;
    color: aliceblue;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;
    &::placeholder{
      color: white;
    }
  }

@media screen and (max-width:600px){
flex-direction: column;
height: 60px;
}

`;
const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;
export const Button = styled.button`
  background: ${({isSelected})=>(isSelected) ? "black" : "#ff4343"};
  outline:1px solid ${({isSelected})=>(isSelected) ? "white" : "#ff4343"};

  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background: #f22f2f;
  }



`;
