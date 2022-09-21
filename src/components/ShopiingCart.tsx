import { Offcanvas, Stack } from 'react-bootstrap'
import { ShoppingCart } from '../context/ShoppingCartContext'
import formatCurrency from '../utilites/formatCurrency'
import storeItems from '../data/items.json';
import CartItem from './CartItem'

type ShopiingCarttProps = {
    isOpen: boolean
}

const ShopiingCartt = ({ isOpen }: ShopiingCarttProps) => {

    const { closeCart, cartItems } = ShoppingCart()

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                            const item = storeItems.find(i => i.id === cartItem.id)
                            return total + (item?.price || 0) * cartItem.quantity
                        }, 0))}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ShopiingCartt