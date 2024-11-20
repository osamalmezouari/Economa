import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getproductsCards } from "./productThunk"
import { ProductCardStateType, ProductCardType } from "../../interfaces/product"

const initialState: ProductCardStateType = {
    productsCard: {
        data: [],
        loading: false,
        error: ""
    }
}


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getproductsCards.pending, (state) => {
            state.productsCard.loading === true
            state.productsCard.error === null
        })
            .addCase(getproductsCards.rejected, (state, action) => {
                state.productsCard.loading = false
                state.productsCard.error = action.payload as string
            })
            .addCase(getproductsCards.fulfilled, (state, action: PayloadAction<ProductCardType[]>) => {
                state.productsCard.loading = false
                state.productsCard.error = ''
                state.productsCard.data = action.payload
            })
    }
})

export const productsReducer = productsSlice.reducer
export default productsSlice.reducer