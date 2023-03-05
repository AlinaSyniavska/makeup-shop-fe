import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IItem, IItems, IProduct, IQueryParams } from "../../interfaces";
import { adminItemService, productService } from "../../services";
import {ratingEnum, urlCharacteristic} from "../../constants";

interface IState {
  products: IProduct[];
  productDetails: IProduct | null;
  brands: IItem[];
  productTypes: IItem[];
  categories: IItem[];
  productForUpdate: null;
  status: string;

  page: string;
  perPage: string;
  count: string;
  sortOrder: number;
  filterBy: string[];
}

const initialState: IState = {
  products: [],
  productDetails: null,
  brands: [],
  productTypes: [],
  categories: [],
  productForUpdate: null,
  status: "",

  page: "1",
  perPage: "20",
  count: "0",
  sortOrder: ratingEnum.HIGH,
  filterBy: [],
};

let urlForGetCharacteristics = "";

const getAll = createAsyncThunk<IProduct[], { params: Partial<IQueryParams> }>(
  "productSlice/getAll",
  async ({ params }, { rejectWithValue }) => {
    try {
      const { data } = await productService.getAll(params);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getAtUrl = createAsyncThunk<IProduct[], { params: Partial<IQueryParams>; url: string }>(
    "productSlice/getAtUrl",
    async ({ params, url }, { rejectWithValue }) => {
  try {
    const { data } = await productService.getAll(params, url);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

const getById = createAsyncThunk<IProduct, { id: String }>(
  "productSlice/getById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await productService.getById(id);
      return data;
    } catch (e: any) {
      return rejectWithValue({ errorStatus: e.message });
    }
  }
);

const getCharacteristics = createAsyncThunk<IItems, { url: string }>(
  "productSlice/getData",
  async ({ url }, { rejectWithValue }) => {
    try {
      const { data } = await adminItemService.getAll(url);
      urlForGetCharacteristics = url;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const createProduct = createAsyncThunk<IProduct, { product: IProduct }>(
  "productSlice/createProduct",
  async ({ product }, { rejectWithValue }) => {
    try {
      const { data } = await productService.create(product);
      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue({ error: error.response.data });
    }
  }
);

const deleteById = createAsyncThunk<void, { id: String }>(
  "productSlice/deleteById",
  async ({ id }, { dispatch, rejectWithValue }) => {
    try {
      await productService.delete(id);
      dispatch(deleteProduct(id));
    } catch (e: any) {
      return rejectWithValue({ errorStatus: e.message });
    }
  }
);

const updateById = createAsyncThunk<
  IProduct,
  { id: String; product: IProduct }
>("productSlice/updateById", async ({ id, product }, { rejectWithValue }) => {
  try {
    const { data } = await productService.update(id, product);

    return data;
  } catch (e: any) {
    return rejectWithValue({ errorStatus: e.message });
  }
});

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProductForUpdate: (state, action) => {
      state.productForUpdate = action.payload.product;
    },
    deleteProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload.id
      );
      state.products.splice(index, 1);
    },

    saveQueryParams: (state, action) => {
      state.page = action.payload.page;
      state.perPage = action.payload.perPage;
      state.sortOrder = action.payload.sortOrder;
      state.filterBy = action.payload.filterBy;
    },

    setPerPage: (state, action) => {
      state.perPage = action.payload.perPage;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        const { page, perPage, data, count } = action.payload as any;
        state.page = page;
        state.perPage = perPage;
        state.products = data;
        state.count = count;
      })
      .addCase(getAll.rejected, (state, action) => {
        const errors = action.payload as any;
        console.log(errors);
      })
      .addCase(getAtUrl.fulfilled, (state, action) => {
        const { page, perPage, data, count } = action.payload as any;
        state.page = page;
        state.perPage = perPage;
        state.products = data;
        state.count = count;
      })
      .addCase(getAtUrl.rejected, (state, action) => {
        const errors = action.payload as any;
        console.log(errors);
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.productDetails = action.payload as any;
      })
      .addCase(getById.rejected, (state, action) => {
        const { errorStatus } = action.payload as any;
        state.status = errorStatus;
      })
      .addCase(getCharacteristics.fulfilled, (state, action) => {
        const { data } = action.payload as IItems;
        switch (urlForGetCharacteristics) {
          case urlCharacteristic.brand:
            state.brands = data;
            break;
          case urlCharacteristic.productType:
            state.productTypes = data;
            break;
          case urlCharacteristic.category:
            state.categories = data;
            break;
          default:
            console.error("urlForGetData not valid");
        }
      })
      .addCase(getCharacteristics.rejected, (state, action) => {
        const errors = action.payload as any;
        console.error(errors);
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        console.log(action.payload);
      })

      .addCase(deleteById.rejected, (state, action) => {
        const { errorStatus } = action.payload as any;
        state.status = errorStatus;
      })
      .addCase(updateById.fulfilled, (state, action) => {
        const { id, product } = action.payload as any;
        const index = state.products.findIndex((product) => product._id === id);
        state.products[index] = { ...state.products[index], ...product };
        state.productForUpdate = null;
      })
      .addCase(updateById.rejected, (state, action) => {
        const { errorStatus } = action.payload as any;
        state.status = errorStatus;
      });
  },
});

const {
  reducer: productReducer,
  actions: { setPerPage, saveQueryParams, deleteProduct, setProductForUpdate },
} = productSlice;

const productActions = {
  createProduct,
  deleteById,
  deleteProduct,
  getAll,
  getAtUrl,
  getById,
  getCharacteristics,
  saveQueryParams,
  setPerPage,
  setProductForUpdate,
  updateById,
};

export { productActions, productReducer };
