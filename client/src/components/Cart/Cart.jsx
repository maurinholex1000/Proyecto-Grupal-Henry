import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import utils from "../../redux/utils/index";
import { concatCarts } from "../../utils/index";
import { getCartFromUser, updateUserCart } from "../../redux/actions/index";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Card,
  Button,
  Typography,
  CardContent,
  ButtonGroup,
  ButtonBase,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const Cart = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const userInfo = useSelector((state) => state.userInfo);
  const userCart = useSelector((state) => state.user.cart);

  const emptyCart = { productsList: [], totalPrice: 0 };

  const [cart, setCart] = useLocalStorage("cart", emptyCart);

  const totalPrice = cart
    ? cart.productsList.reduce((acc, cur) => {
        acc += cur.price * cur.quantity;
        return utils.roundNumber(acc);
      }, 0)
    : 0;

  useEffect(() => {
    if (userInfo) {
      dispatch(getCartFromUser(userInfo._id));
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (userInfo && userCart?.length) {
      const allCarts = concatCarts(userCart, cart.productsList);
      setCart({
        ...cart,
        productsList: allCarts,
      });
      dispatch(updateUserCart(userInfo._id, allCarts));
    }
  }, [dispatch, userInfo, userCart]);

  // Handlers
  const handleUpdateQuantity = (option) => {
    if (userInfo) {
      setCart({
        ...cart,
        productsList: utils.updateQuantity(cart.productsList, option),
      });
      dispatch(updateUserCart(userInfo._id, cart.productsList));
    } else {
      setCart({
        ...cart,
        productsList: utils.updateQuantity(cart.productsList, option),
      });
    }
  };

  const handleRemoveProduct = (id) => {
    if (userInfo) {
      setCart({
        ...cart,
        productsList: cart.productsList.filter((elem) => elem._id !== id),
        totalPrice: totalPrice,
      });
      dispatch(updateUserCart(userInfo._id, cart.productsList));
    } else {
      setCart({
        ...cart,
        productsList: cart.productsList.filter((elem) => elem._id !== id),
        totalPrice: totalPrice,
      });
    }
  };

  const handleRemoveAll = () => {
    if (userInfo) {
      setCart(emptyCart);
      dispatch(updateUserCart(userInfo._id, []));
    } else {
      setCart(emptyCart);
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setCart({
      ...cart,
      totalPrice: totalPrice,
    });
    history.push("/checkout");
  };

  const listProducts = cart.productsList.map((elem, idx) => (
    <div key={idx} className={classes.root}>
      <Card style={{ margin: 20, padding: 20 }} variant="outlined">
        <CardContent>
          <ButtonBase component={Link} to={`/detail/${elem._id}`}>
            <img
              className={classes.img}
              src={elem.image_url}
              alt={elem.name}
              height="200"
            />
          </ButtonBase>
          <Typography gutterBottom variant="h5">
            {elem.name}
          </Typography>
          <Typography variant="body2">
            Precio: $ {utils.roundNumber(elem.price * elem.quantity)}
          </Typography>
          <Typography variant="subtitle1">Cantidad: {elem.quantity}</Typography>
          <ButtonGroup disableElevation variant="contained">
            <Button
              color="primary"
              onClick={() =>
                handleUpdateQuantity({ id: elem._id, value: "min" })
              }
              disabled={elem.quantity === 1 && true}
            >
              -
            </Button>
            <Button
              color="primary"
              onClick={() =>
                handleUpdateQuantity({ id: elem._id, value: "max" })
              }
            >
              +
            </Button>
          </ButtonGroup>
        </CardContent>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleRemoveProduct(elem._id)}
        >
          Remover de la lista
        </Button>
      </Card>
    </div>
  ));

  if (!listProducts || !listProducts.length) {
    return (
      <Container style={{ margin: 50 }}>
        <Typography variant="h4">
          <b>Tu carrito está vacío.</b>
          <br />
          Vuelve a la tienda y agrega los productos que desees comprar.
        </Typography>
        <Button
          component={Link}
          to="/"
          style={{ margin: 50 }}
          variant="contained"
          color="secondary"
        >
          VOLVER A LA TIENDA
        </Button>
      </Container>
    );
  }

  return (
    <Grid container justifyContent="center">
      <Grid>
        <Button component={Link} to="/" variant="contained" color="primary">
          Agrega otro producto
        </Button>
      </Grid>
      <Grid item style={{ margin: 20 }}>
        <Typography>Precio total: $ {totalPrice}</Typography>
        <Button
          variant="contained"
          style={{ margin: 30 }}
          color="primary"
          onClick={() => handleRemoveAll()}
        >
          VACIAR CARRITO
        </Button>
        {listProducts}
        <Grid item>
          {!userInfo ? (
            <Container>
              <Typography>
                Debes estar registrado para poder continuar con la compra
              </Typography>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
                style={{ margin: 30 }}
              >
                Registrate
              </Button>
            </Container>
          ) : (
            listProducts.length && (
              <Container>
                <Button
                  variant="contained"
                  style={{ margin: 30 }}
                  color="primary"
                  onClick={(e) => handleCheckout(e)}
                >
                  COMPRAR
                </Button>
              </Container>
            )
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cart;
