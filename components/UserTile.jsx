const UserTile = ({ key, data }) => {
  console.log(data);
  return (
    <>
      <div>UserTile</div>
      <h1>{data.address}</h1>
      <h3>{data.score}</h3>
    </>
  );
};

export default UserTile;
