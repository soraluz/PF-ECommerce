import {
  GET_BOOKS,
  GET_DETAIL_BOOK,
  POST_CREATE_BOOK,
  RESET_DETAIL,
  ORDER_NAME,
  SEARCH_BOOK,
  GET_ALL_CATEGORIES,
  SEARCH_AUTHOR,
  ORDER_PRICE,
  CATEGORY_BOOKS,
  RESET_SEARCH_BOOK,
  RESET_CATEGORY_BOOKS,
} from "./types";

const initialState = {
  books: [],
  detail: {},
  booksFilter: [],
  categories: [],
  mostPopulars: [],
  booksBySearch: [],
  booksByCategory: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: [...action.payload],
        booksFilter: [...action.payload],
      };

    case GET_DETAIL_BOOK:
      // let categoriesBook = action.payload.categories.map((e) => e.name);
      // let arreglo = { ...action.payload };
      // categoriesBook = categoriesBook.toString();
      // console.log(categoriesBook);
      // arreglo.categories = categoriesBook;
      return {
        ...state,
        detail: { ...action.payload },
      };

    case POST_CREATE_BOOK:
      return {
        ...state,
      };

    case RESET_DETAIL:
      return {
        ...state,
        detail: {},
      };

    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    // case ORDER_NAME:
    //   return {
    //     ...state,
    //     books: action.payload,
    //   };

    case ORDER_NAME:
      let orderAuxName = [...state.booksByCategory];
      console.log("orderAuxName: ", orderAuxName);
      let orderBookName = orderAuxName.sort((a, b) => {
        if (a.title <= b.title) {
          return action.payload === "asc" ? -1 : 1;
        }

        if (a.title > b.title) {
          return action.payload === "des" ? -1 : 1;
        }
      });
      return {
        ...state,
        booksByCategory: orderBookName,
      };

    // case ORDER_PRIECE:
    //   console.log("action.payload: ", action.payload);
    //   return {
    //     ...state,
    //     books: action.payload.items,
    //   };

    case ORDER_PRICE:
      let orderAuxPrice = [...state.booksByCategory];
      let orderBookPrice = orderAuxPrice.sort((a, b) => {
        if (a.price <= b.price) {
          return action.payload === "asc" ? -1 : 1;
        }

        if (a.price > b.price) {
          return action.payload === "desc" ? -1 : 1;
        }
      });
      // console.log("orderBookPrice: ", orderBookPrice);
      return {
        ...state,
        booksByCategory: orderBookPrice,
      };

    // case CATEGORY_BOOKS:
    //   return {
    //     ...state,
    //     books: action.payload,
    //   };

    case CATEGORY_BOOKS:
      return {
        ...state,
        booksByCategory: action.payload,
      };

    case RESET_CATEGORY_BOOKS:
      return {
        ...state,
        booksByCategory: [],
      };

    case SEARCH_BOOK:
      return {
        ...state,
        booksBySearch: [...action.payload],
      };

    case RESET_SEARCH_BOOK:
      return {
        ...state,
        booksBySearch: [],
      };

    default:
      return state;
  }
}

export default rootReducer;

/*
case ORDER_NAME:
  let orderAuxName = [...state.booksFilter];
  let orderBookName = orderAuxName.sort((a, b) => {
    if (a.title <= b.name) {
      return action.payload === "asc" ? -1 : 1;
    }

    if (a.title > b.title) {
      return action.payload === "des" ? -1 : 1;
    }
  });
  return {
    ...state,
    booksFilter: orderBookName,
  };

  case SEARCH_BOOK:
    let searchBook = [...state.books]
    searchBook = searchBook.filter(e => e.title.toLowerCase().includes(action.payload.toLowerCase()))
    if(searchBook.length === 0){
      searchBook = [...state.books]
      alert("Libro no encontrado")
    }
    return {
      ...state,
      booksFilter: searchBook
    }

*/
