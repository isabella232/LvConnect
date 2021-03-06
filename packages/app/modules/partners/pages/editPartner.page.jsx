// @flow

import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import type { ContextRouter } from 'connected-react-router';
import type { ConnectedEditPartnerProps } from './editPartner.connector';

import PartnerForm from '../components/partnerForm.component';
import Meta from '../../../components/meta.component';

type EditPartnerProps = ContextRouter & ConnectedEditPartnerProps & {
  partnerId?: String,
  title?: String,
  cardTitle?: String,
  autoFocus?: boolean,
};

type EditPartnerState = {
  open: boolean,
}

class EditPartner extends Component<EditPartnerProps, EditPartnerState> {
  constructor(props: EditPartnerProps) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentWillMount() {
    const { partnerId, match, fetchPartnerDetails } = this.props;
    fetchPartnerDetails(partnerId || match.params.partnerId);
  }

  componentDidUpdate(prevProps: EditPartnerProps) {
    const { match, fetchPartnerDetails } = this.props;
    if (match.params.partnerId !== prevProps.match.params.partnerId) {
      fetchPartnerDetails(match.params.partnerId);
    }
  }

  handleFormSubmit = (data: User) => {
    const { partnerId, match, editPartner } = this.props;
    return editPartner(partnerId || match.params.partnerId, data);
  };

  handleDeletePartner = async () => {
    const { deletePartner, match, push } = this.props;
    await deletePartner(match.params.partnerId);
    push('/dashboard/partners');
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { title, cardTitle, partner, isLoading, autoFocus } = this.props;
    const { open } = this.state;
    return !isLoading && partner && (
      <PartnerForm editMode initialValues={partner} onFormSubmit={this.handleFormSubmit} autoFocus={autoFocus}>
        {({ children, valid, pristine }) => (
          <Card>
            <Meta title={`${title || `${partner.firstName} ${partner.lastName}`}`} />
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {cardTitle || `${partner.firstName} ${partner.lastName}`}
              </Typography>
              {children}
            </CardContent>
            <Dialog
              open={open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              data-test-id="partnerDeleteDialog"
            >
              <DialogTitle id="alert-dialog-title">Confirmer la suppresion</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {'La suppression d\'un partner est irréverssible et ne permet plus d\'utiliser ses données sur'}
                  les application auquelles il était connecté. Si vous souhaitez désactiver ce compte, renseignez une
                  date de sortie pour désactiver le compte.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                  Renseigner une date de sortie
                </Button>
                <Button onClick={this.handleDeletePartner} data-test-id="partnerDeleteSubmit">
                  Supprimer
                </Button>
              </DialogActions>
            </Dialog>
            <CardActions>
              <Button
                size="small"
                color="primary"
                type="submit"
                disabled={!valid || pristine}
                data-test-id="partnerEditSubmit"
              >
                Sauvegarder
              </Button>
              <Button
                size="small"
                type="button"
                onClick={this.handleOpen}
                data-test-id="partnerDeleteButton"
              >
                Supprimer
              </Button>
            </CardActions>
          </Card>
        )}
      </PartnerForm>
    );
  }
}

export default EditPartner;
