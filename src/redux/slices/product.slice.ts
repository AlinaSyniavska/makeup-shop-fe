import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IItem, IItems, IProduct, IQueryParams} from "../../interfaces";
import {adminItemService, productService} from "../../services";
import {ratingEnum, urlGetData} from "../../constants";


interface IState {
    products: IProduct[],
    brands: IItem[],
    productTypes: IItem[],
    categories: IItem[],
    productForUpdate: null,
    formErrors: any,
    // registerError: boolean,
    status: string,

    page: string,
    perPage: string,
    count: string,
    sortOrder: number,
    filterBy: string,
}

const initialState: IState = {
    products: [],
    brands: [],
    productTypes: [],
    categories: [],
    productForUpdate: null,
    formErrors: {},
    // registerError: false,
    status: '',

    page: '1',
    perPage: '20',
    count: '0',
    sortOrder: ratingEnum.HIGH,
    filterBy: '',
};

let urlForGetData = '';

/*const getAll = createAsyncThunk<IProduct[], { page: string, perPage: string, sortOrder: number }>(
    'productSlice/getAll',
    async ({page, perPage, sortOrder}, {rejectWithValue}) => {
        try {
            const {data} = await productService.getAll(page, perPage, sortOrder);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
);*/

const getAll = createAsyncThunk<IProduct[], { params: Partial<IQueryParams> }>(
    'productSlice/getAll',
    async ({params}, {rejectWithValue}) => {
        try {
            const {data} = await productService.getAll(params);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
);

const getData = createAsyncThunk<IItems, { url: string }>(
    'productSlice/getData',
    async ({url}, {rejectWithValue}) => {
        try {
            const {data} = await adminItemService.getAll(url);
            urlForGetData = url;
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
);

const createProduct = createAsyncThunk<IProduct, { product: IProduct }>(
    'productSlice/createProduct',
    async ({product}, {rejectWithValue}) => {
        try {
            const {data} = await productService.create(product);
            return data;
        } catch (error: any) {
            console.log(error);
            return rejectWithValue({errorsFromDB: error.response.data});
        }
    }
);


const deleteById = createAsyncThunk<void, { id: String }>(
    'productSlice/deleteById',
    async ({id}, {dispatch, rejectWithValue}) => {
        try {
            await productService.delete(id);
            dispatch(deleteProduct(id));
        } catch (e: any) {
            return rejectWithValue({errorStatus: e.message})
        }
    }
);

const updateById = createAsyncThunk<IProduct, { id: String, product: IProduct }>(
    'productSlice/updateById',
    async ({id, product}, {rejectWithValue}) => {
        try {
            const {data} = await productService.update(id, product);

            return data;
        } catch (e: any) {
            return rejectWithValue({errorStatus: e.message})
        }
    }
);


const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setProductForUpdate: (state, action) => {
            state.productForUpdate = action.payload.product;
        },
        deleteProduct: (state, action) => {
            const index = state.products.findIndex(product => product._id === action.payload.id);
            state.products.splice(index, 1);
        },

        saveQueryParams: (state, action) => {
            state.page = action.payload.page;
            state.perPage = action.payload.perPage;
            state.sortOrder = action.payload.sortOrder;
        },

        setPerPage: (state, action) => {
            state.perPage = action.payload.perPage;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                const {page, perPage, data, count} = action.payload as any;
                state.page = page;
                state.perPage = perPage;
                state.products = data;
                state.count = count;
            })
            .addCase(getAll.rejected, (state, action) => {
                const errors = action.payload as any;
                console.log(errors);
            })
            .addCase(getData.fulfilled, (state, action) => {
                const {data} = action.payload as IItems;
                switch (urlForGetData) {
                    case urlGetData.brand:
                    state.brands = data;
                    break;
                    case urlGetData.productType:
                    state.productTypes = data;
                    break;
                    case urlGetData.category:
                    state.categories = data;
                    break;
                    default:
                        console.error('urlForGetData not valid');
                }
            })
            .addCase(getData.rejected, (state, action) => {
                const errors = action.payload as any;
                console.error(errors);
            })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.products.push(action.payload);
        })
        .addCase(createProduct.rejected, (state, action) => {
            const {errorsFromDB} = action.payload as any;
            state.formErrors = errorsFromDB;
        })

        .addCase(deleteById.rejected, (state, action) => {
            const {errorStatus} = action.payload as any;
            state.status = errorStatus;
        })
        .addCase(updateById.fulfilled, (state, action) => {
            const {id, product} = action.payload as any;
            const index = state.products.findIndex(product => product._id === id);
            state.products[index] = {...state.products[index], ...product};
            state.productForUpdate = null;
        })
        .addCase(updateById.rejected, (state, action) => {
            const {errorStatus} = action.payload as any;
            state.status = errorStatus;
        })
    },
});

const {reducer: productReducer, actions: {setPerPage, saveQueryParams, deleteProduct, setProductForUpdate}} = productSlice;

const productActions = {
    createProduct,
    deleteById,
    deleteProduct,
    getAll,
    getData,
    saveQueryParams,
    setPerPage,
    setProductForUpdate,
    updateById,
};

export {
    productActions,
    productReducer,
}
