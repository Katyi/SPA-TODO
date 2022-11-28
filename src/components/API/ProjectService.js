export default class ProjectService {
  static async getAll() {
    // const response = await fetch(`https://spa-todo-15176-default-rtdb.europe-west1.firebasedatabase.app?_sort=id&order=desc`,{});
    const response = await fetch(`https://my-postcards-api.herokuapp.com/albums/?_sort=id&order=desc`);
    const data = await response.json();
    // console.log(data);
    return data;
  }

  static async getById(id) {
    const response = await fetch(`https://my-postcards-api.herokuapp.com/albums/${id}`);
    const data = await response.json();
      return data;
  }

  // static async getPhotosByAlbumId(id) {
  //   const response = await fetch(`https://my-postcards-api.herokuapp.com/albums/${id}/photos/`);
  //   const data = await response.json();
  //     return data;
  // }
}