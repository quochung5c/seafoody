import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: "white",
    textDecoration: "none"
  },
  paper: {
    marginRight: theme.spacing(2)
  }
}));

function Header() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [login, setLogin] = React.useState(false);

  const handleClickOpen = () => {
    setLogin(true);
  };

  const handleClickClose = () => {
    setLogin(false);
  };
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };
  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            ref={anchorRef}
            aria-controls="menu-list-grow"
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <MenuIcon />
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper id="menu-list-grow">
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClose}>
                        Thông tin người dùng
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        Thông tin sản phẩm
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        Thông tin công ty
                      </MenuItem>
                      <MenuItem onClick={handleClose}>Quản lý hóa đơn</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              {" "}
              Quản lý siêu thị Seafoody
            </Link>
          </Typography>
          <Button color="inherit" onClick={handleClickOpen}>
            Đăng nhập
          </Button>
          <Dialog
            open={login}
            onClose={handleClickClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Đăng nhập</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Đăng nhập để tham gia giao diện mua hàng qua CMS
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="email"
                label="Email"
                type="email"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="password"
                name="password"
                label="Mật khẩu"
                type="password"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickClose} color="primary">
                hủy
              </Button>
              <Button onClick={handleClickClose} color="secondary">
                đăng nhập
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
