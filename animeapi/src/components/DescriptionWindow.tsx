import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link underline='none' onClick={handleClickOpen} style={{cursor: 'pointer'}}>
        <Typography
            variant="h5"
            style={{ color: '#ffffff', fontWeight: 'bold' }}>
            アニメで振り返ろう
        </Typography>
      </Link>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            アニメで振り返ろう
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
           <h4>使い方と注意事項</h4>
           放送年 放送時期をそれぞれ選択してください。
           サーバーの処理速度の問題で表示まで時間がかかります。
           気長に待ってください。
          </Typography>
          <Typography gutterBottom>
            <h4>使ったもの</h4>
            <ul>
                <li>React(TypeScript)</li>
                <li>PHP</li>
                <li>
                    <a href="https://github.com/Project-ShangriLa/sora-playframework-scala">
                        ShangriLa API
                    </a>
                </li>
            </ul>
          </Typography>
          <Typography gutterBottom>
            <h4>コード</h4>
                <a href="https://github.com/OHMORIYUSUKE/animeApi-PHP">
                    GitHub
                </a>
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}