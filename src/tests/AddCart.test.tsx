import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import ProductDetailCard from "../components/ProductDetailCard";



describe('Unit test for add to cart function', () => {

  it('Handle Add To Cart rendered correctly', async () => {
    const user = userEvent.setup();
    render(
      <ProductDetailCard 
        title={"Test detail title"} 
        category={"Test detail category"} 
        description={"Test detail description"} 
        price={20} 
        image={"https://via.placeholder.com/150"} 
        addCart={() => {}}        
      />
    );
    const addToCartButton = screen.getByRole('button', {name: /add to cart/i});
    await user.click(addToCartButton);
    expect(addToCartButton).toBeEnabled();
  });


});
