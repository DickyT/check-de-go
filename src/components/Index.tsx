import * as React from 'react';
import * as path from 'path';
import * as os from 'os';
import { ipcRenderer, shell } from 'electron';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IIndexProps {

}

interface IIndexState {
  isPrePrinted?: boolean;
  payerName?: string;
  payerAddressLine1?: string;
  payerAddressLine2?: string;
  payeeName?: string;
  amount?: string;
  date?: string;
  bankName?: string;
  bankAddress?: string;
  routingNumber?: string;
  accountNumber?: string;
  checkNumber?: string;
  memo?: string;
  paper?: string;
  dpi?: number;
  saveDir?: string;
  themeCSS?: string;
  loading?: boolean;
}

export default class Index extends React.Component<IIndexProps, IIndexState> {
  constructor(props: IIndexProps) {
    super(props);
    this.state = {
      isPrePrinted: true,
      payerName: 'Tesla Motors',
      payerAddressLine1: '3500 Deer Creek Road',
      payerAddressLine2: 'Palo Alto, CA 94304',
      payeeName: 'Model Y Owner',
      amount: '1.00',
      date: (new Date()).toISOString().replace(/T[0-9]+.*$/, ''),
      bankName: 'Bank of Tokyo-Mitsubishi UFJ',
      bankAddress: '1909 K St NW, Washington, DC 20006',
      routingNumber: '114514',
      accountNumber: '1145141919',
      checkNumber: '001',
      memo: 'VOID CHECK, do not cash in any bank.',
      paper: 'LETTER',
      dpi: 600,
      saveDir: path.join(os.homedir(), 'Desktop', 'check.png'),
      themeCSS: 'https://gistcdn.githack.com/DickyT/a41f58ad4bc704d4791fff7b842a8539/raw/e168afec91b693ab580ef0ef2e74063d972a6be1/miku.css',
      loading: false,
    }
  }

  inputChange = (name: string) => (event: React.FormEvent<HTMLInputElement>) => {
    let value;
    if (event.currentTarget.type === 'checkbox') {
      value = event.currentTarget.checked;
    } else {
      value = event.target['value'];
    }

    const newState: IIndexState = {
      [name]: value,
    };

    if (!this.state.isPrePrinted) {
      newState.amount = '';
      newState.payeeName = '　';
    }

    this.setState(newState);
  };

  pickSaveDir = () => {
    ipcRenderer.send('ON_SELECT_SAVE_DIR', this.state.saveDir);
  };

  receiveSaveDir = (_: any, dir: string | undefined) => {
    let saveDir = dir || '';
    if (!saveDir.endsWith('.png') && saveDir !== '') {
      saveDir += '.png';
    }
    this.setState({
      saveDir,
    });
  };

  saveConfig = () => {
    ipcRenderer.send('ON_SAVE_CONFIG', this.state);
  };

  loadConfig = () => {
    ipcRenderer.send('ON_LOAD_CONFIG', this.state);
  };

  onLoadConfigDone = (_: any, config: any) => {
    const newState = JSON.parse(config);
    this.setState(newState);
  };

  generateCheck = (preview: boolean = false) => {
    const printFrontProps = {
      isCheckFront: true,
      args: { ...this.state, preview },
    };

    const printBackProps = {
      isCheckFront: false,
    };

    const indexHTMLPath = window.location.href;
    const frontURL = `${indexHTMLPath}#${encodeURIComponent(JSON.stringify(printFrontProps))}`;

    const allURL = [frontURL];

    if (!preview) {
      const backURL = `${indexHTMLPath}#${encodeURIComponent(JSON.stringify(printBackProps))}`;
      allURL.push(backURL);
    }

    ipcRenderer.send('ON_GENERATE_SCREENSHOT', {
      preview,
      urls: allURL,
      dir: this.state.saveDir,
    });

    if (!preview) {
      this.setState({
        loading: true,
      });
    }
  };

  onScreenshotDone = (_: any, err: any) => {
    this.setState({
      loading: false,
    });
    shell.showItemInFolder(this.state.saveDir!);
  };

  showCopyright = () => {
    shell.openExternal('https://github.com/DickyT/check-de-go');
  };

  componentDidMount() {
    ipcRenderer.on('ON_SELECT_SAVE_DIR_DONE', this.receiveSaveDir);
    ipcRenderer.on('ON_GENERATE_SCREENSHOT_DONE', this.onScreenshotDone);
    ipcRenderer.on('ON_LOAD_CONFIG_DONE', this.onLoadConfigDone);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('ON_SELECT_SAVE_DIR_DONE', this.receiveSaveDir);
    ipcRenderer.removeListener('ON_GENERATE_SCREENSHOT_DONE', this.onScreenshotDone);
    ipcRenderer.removeListener('ON_LOAD_CONFIG_DONE', this.onLoadConfigDone);
  }

  render() {
    return (
      <div className="check-info-form">
        <div className="check-metadata">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.isPrePrinted}
                  onChange={this.inputChange('isPrePrinted')}
                />
              }
              label="Pre-Printed Check"
            />
          </FormGroup>
          <div className="author">
            <iframe src="https://ghbtns.com/github-btn.html?user=DickyT&repo=check-de-go&type=star&count=true" scrolling="0" width="100px" height="20px"></iframe>
            <iframe src="https://ghbtns.com/github-btn.html?user=DickyT&repo=check-de-go&type=fork&count=true" scrolling="0" width="100px" height="20px"></iframe>
            <iframe src="https://ghbtns.com/github-btn.html?user=DickyT&type=follow&count=true" scrolling="0" width="150px" height="20px"></iframe>
            <Button onClick={this.showCopyright}>
              Copyright Info
            </Button>
          </div>
        </div>
        <div className="content">
          <FormControl component="fieldset" className="check-info">
            <FormGroup>
              <FormGroup>
                <TextField
                  label="Payer Name"
                  variant="outlined"
                  value={this.state.payerName}
                  onChange={this.inputChange('payerName')}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  label="Payer Address Line 1"
                  variant="outlined"
                  value={this.state.payerAddressLine1}
                  onChange={this.inputChange('payerAddressLine1')}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  label="Payer Address Line 2"
                  variant="outlined"
                  value={this.state.payerAddressLine2}
                  onChange={this.inputChange('payerAddressLine2')}
                />
              </FormGroup>
            </FormGroup>
          </FormControl>
          <FormControl component="fieldset" className="main-info">
            <FormGroup>
              <FormGroup>
                <TextField
                  label="Payee Name"
                  variant="outlined"
                  value={this.state.payeeName}
                  disabled={!this.state.isPrePrinted}
                  onChange={this.inputChange('payeeName')}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  label="Amount"
                  type="number"
                  variant="outlined"
                  value={this.state.amount}
                  disabled={!this.state.isPrePrinted}
                  onChange={this.inputChange('amount')}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  label="Date"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.date}
                  onChange={this.inputChange('date')}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  label="Bank Name"
                  variant="outlined"
                  value={this.state.bankName}
                  onChange={this.inputChange('bankName')}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  label="Bank Address"
                  variant="outlined"
                  value={this.state.bankAddress}
                  onChange={this.inputChange('bankAddress')}
                />
              </FormGroup>
            </FormGroup>
          </FormControl>
          <FormControl component="fieldset" className="payment-info">
            <FormGroup>
              <TextField
                label="Routing Number"
                type="text"
                variant="outlined"
                value={this.state.routingNumber}
                onChange={this.inputChange('routingNumber')}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                label="Account Number"
                type="text"
                variant="outlined"
                value={this.state.accountNumber}
                onChange={this.inputChange('accountNumber')}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                label="Check Number"
                type="number"
                variant="outlined"
                value={this.state.checkNumber}
                onChange={this.inputChange('checkNumber')}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                label="Memo"
                variant="outlined"
                value={this.state.memo}
                onChange={this.inputChange('memo')}
              />
            </FormGroup>
          </FormControl>
        </div>
        <Divider className="divider" />
        <div className="style-options">
          <TextField
            label="Check theme CSS file URL"
            variant="outlined"
            value={this.state.themeCSS}
            className="theme-css-input"
            onChange={this.inputChange('themeCSS')}
          />
        </div>
        <Divider className="divider" />
        <div className="print-options">
          <FormControl variant="outlined">
            <InputLabel>Paper</InputLabel>
            <Select
              value={this.state.paper}
              onChange={this.inputChange('paper')}
              input={
                <OutlinedInput labelWidth={45} />
              }
            >
              <MenuItem value={'LETTER'}>Letter</MenuItem>
              <MenuItem value={'A4'}>A4</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel>DPI</InputLabel>
            <Select
              value={this.state.dpi}
              onChange={this.inputChange('dpi')}
              input={
                <OutlinedInput labelWidth={30} />
              }
            >
              <MenuItem value={200}>200</MenuItem>
              <MenuItem value={300}>300</MenuItem>
              <MenuItem value={400}>400</MenuItem>
              <MenuItem value={600}>600</MenuItem>
              <MenuItem value={1200}>1200</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Save Directory"
            variant="outlined"
            value={this.state.saveDir}
            className="save-dir-input"
            onClick={this.pickSaveDir}
          />
        </div>
        <div className="app-operations">
          <Button
            variant="contained"
            color="default"
            className="operation-btn"
            onClick={() => this.generateCheck(true)}
          >
            Preview Check
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="operation-btn"
            onClick={() => this.generateCheck(false)}
          >
            Generate Check
          </Button>
          <Button
            variant="contained"
            color="default"
            className="operation-btn"
            onClick={this.saveConfig}
          >
            Export Config
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="operation-btn"
            onClick={this.loadConfig}
          >
            Load Config
          </Button>
        </div>
        <Dialog
          open={this.state.loading}>
          <DialogTitle>Please wait</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              PDF generating...
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}