import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import ProductCard from "../components/ProductCard";

interface ProductCardProps {
  id: number,
  title: string,
  category: string,
  price: number,
  image: string
  addCart: VoidFunction,
  viewDetail: VoidFunction
}

const MockProductData: ProductCardProps = {
    id: 1,
    title: 'Product Title Test',
    category: 'Product Category Test',
    price: 20,
    image: 'https://via.placeholder.com/150',
    addCart: () => {alert('handle add cart')},
    viewDetail: () => {alert('handle view detail')}
  };

describe('Unit Test for Product Card Component', () => {

  // Product Data Unit Testing
  it('Product Card Data rendered correctly', () => {
    
    render(
      <ProductCard 
        id={MockProductData.id}
        title={MockProductData.title}
        category={MockProductData.category}
        price={MockProductData.price}
        image={MockProductData.image}
        viewDetail={MockProductData.viewDetail}
      />
    );

    // Assert Product Title rendered correctly
    const productTitle = screen.getByText(/product title test/i);
    expect(productTitle).toBeInTheDocument();

    // Assert Product Category rendered correctly
    const productCategory = screen.getByText(/Product Category Test/i);
    expect(productCategory).toBeInTheDocument();

    // Assert Product Price rendered correctly
    const productPrice = screen.getByText(/\$ 20/i);
    expect(productPrice).toBeInTheDocument();

    // Assert Product Image rendered correctly
    const productImage = screen.getByRole('img', {name: /product title test/i});
    expect(productImage).toHaveAttribute('src', MockProductData.image);

  });

  it('Handle View Detail rendered correctly', async () => {
    
    const user = userEvent.setup();

    render(
      <ProductCard 
        id={MockProductData.id}
        title={MockProductData.title}
        category={MockProductData.category}
        price={MockProductData.price}
        image={MockProductData.image}
        viewDetail={MockProductData.viewDetail}
      />
    );

    const addToCartButton = screen.getByRole('button', {name: /view detail/i});
    await user.click(addToCartButton);

    expect(addToCartButton).toBeEnabled();

  });

});