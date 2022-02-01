import React, {
  useCallback, useLayoutEffect, useRef, useState,
} from 'react';
import { jsPDF } from 'jspdf';

import CheckCanvas, {
  CheckCanvasRef, CheckInfo,
} from './CheckCanvas';
import './PrintSettings.css';
import { usePrevious, CHECK_ORIGINAL_HEIGHT, CHECK_ORIGINAL_WIDTH } from './utils';

type ExportMode = 'preview' | 'print' | 'download';

const PAPER_CHECK_WIDTH_INCH = 8;
const PAPER_CHECK_HEIGHT_INCH = (PAPER_CHECK_WIDTH_INCH * CHECK_ORIGINAL_HEIGHT)
  / CHECK_ORIGINAL_WIDTH;

interface ExportSettings {
  paperType: string;
  dpi: string;
  topMargin: string;
  filename: string;
  cuttingHelper: boolean;
}

interface Props {
  renderOptions: CheckInfo;
}

export default function PrintSettings({ renderOptions }: Props) {
  const [exportRenderOptions, setExportRenderOptions] = useState<CheckInfo>();
  const previousERO = usePrevious(exportRenderOptions);

  const [exportScale, setExportScale] = useState(1);
  const [exportMode, setExportMode] = useState<ExportMode>('preview');

  const [printSettings, setPrintSettings] = useState<ExportSettings>({
    paperType: 'Letter',
    dpi: '300',
    topMargin: '0.5',
    filename: '',
    cuttingHelper: true,
  });

  const checkRendererRef = useRef<CheckCanvasRef>();

  const exportPDF = useCallback((mode: ExportMode) => {
    const dpi = parseInt(printSettings.dpi, 10);
    setExportScale((PAPER_CHECK_WIDTH_INCH * dpi) / CHECK_ORIGINAL_WIDTH);
    setExportMode(mode);
    setExportRenderOptions({ ...renderOptions });
  }, [printSettings.dpi, renderOptions]);

  useLayoutEffect(() => {
    if (previousERO !== exportRenderOptions) {
      setTimeout(() => {
        const checkRef = checkRendererRef.current;
        if (checkRef != null) {
          const { canvas } = checkRef;

          const PAPER_WIDTH = 8.5;
          const PAPER_HEIGHT = 11;

          const xMargins = (PAPER_WIDTH - PAPER_CHECK_WIDTH_INCH) / 2;
          const topMargin = parseFloat(printSettings.topMargin);

          // eslint-disable-next-line new-cap
          const doc = new jsPDF('p', 'in', [PAPER_WIDTH, PAPER_HEIGHT]);

          doc.addImage(canvas, 'png', xMargins, topMargin, PAPER_CHECK_WIDTH_INCH, PAPER_CHECK_HEIGHT_INCH);
          if (printSettings.cuttingHelper) {
            doc.setLineDashPattern([0.1], 2);
            doc.setLineWidth(0.01);
            doc.line(0, topMargin, PAPER_WIDTH, topMargin);
            doc.line(
              0,
              topMargin + PAPER_CHECK_HEIGHT_INCH,
              8.5,
              topMargin + PAPER_CHECK_HEIGHT_INCH,
            );
            doc.line(xMargins, 0, xMargins, PAPER_HEIGHT);
            doc.line(PAPER_WIDTH - xMargins, 0, PAPER_WIDTH - xMargins, PAPER_HEIGHT);
          }

          const exportFilename = printSettings.filename.length > 0
            ? printSettings.filename
            : `Check_de_Go_${(new Date()).getTime()}.pdf`;

          if (exportMode === 'preview' || exportMode === 'print') {
            if (exportMode === 'print') {
              doc.autoPrint();
            }
            doc.output('dataurlnewwindow');
          } else if (exportMode === 'download') {
            doc.save(exportFilename);
          }
        }
      }, 100);
    }
  }, [
    exportMode,
    exportRenderOptions,
    previousERO,
    printSettings.cuttingHelper,
    printSettings.filename,
    printSettings.topMargin,
  ]);

  return (
    <div className="check-settings">
      <h6>PDF Print Settings</h6>
      <div className="alert alert-info" role="alert">
        Any feedbacks regarding the printing process?
        {' '}
        <a href="https://github.com/DickyT/check-de-go/issues" target="_blank" rel="noreferrer">
          Let us know
        </a>
      </div>
      <div className="row g-3">
        <UserSettings value={printSettings} onChange={setPrintSettings} />
        <hr />
        <div className="col-12 print-actions">
          <button
            className="btn btn-primary btn-lg"
            type="button"
            onClick={() => exportPDF('preview')}
          >
            Preview File
          </button>
          <button
            className="btn btn-primary btn-lg"
            type="button"
            onClick={() => exportPDF('print')}
          >
            Print File
          </button>
          <button
            className="btn btn-secondary btn-lg"
            type="button"
            onClick={() => exportPDF('download')}
          >
            Download File
          </button>
        </div>
      </div>
      {exportRenderOptions != null && (
        <CheckCanvas
          ref={checkRendererRef}
          className="invisible-check"
          previewMode={false}
          scale={exportScale}
          {...exportRenderOptions}
        />
      )}
    </div>
  );
}

function UserSettings({
  value,
  onChange: onChangeFromProps,
}: {
  value: ExportSettings,
  onChange: (_: ExportSettings) => void,
}) {
  const onChange = useCallback((
    formKey: (keyof ExportSettings),
    event: React.ChangeEvent<HTMLInputElement>,
  ) => onChangeFromProps({
    ...value,
    [formKey]: event.target.value,
  }), [onChangeFromProps, value]);

  const onChangeBool = useCallback((
    formKey: (keyof ExportSettings),
    val: boolean,
  ) => onChangeFromProps({
    ...value,
    [formKey]: val,
  }), [onChangeFromProps, value]);

  return (
    <>
      <div className="col-2">
        <label htmlFor="print-paper-size" className="form-label">Paper Size</label>
        <input
          type="text"
          className="form-control"
          id="print-paper-size"
          placeholder="Paper Size"
          value={value.paperType}
          onChange={e => onChange('paperType', e)}
          required
          disabled
        />
      </div>
      <div className="col-2">
        <label htmlFor="print-dpi" className="form-label">DPI</label>
        <input
          type="number"
          className="form-control"
          id="print-dpi"
          placeholder="DPI"
          value={value.dpi}
          onChange={e => onChange('dpi', e)}
          step={100}
          min={100}
          max={3600}
        />
      </div>
      <div className="col-2">
        <label htmlFor="print-top-margin" className="form-label">Top Margin</label>
        <input
          type="number"
          className="form-control"
          id="print-top-margin"
          placeholder="Top Margin"
          value={value.topMargin}
          onChange={e => onChange('topMargin', e)}
          step={0.05}
          min={0}
          max={100}
        />
      </div>
      <div className="col-4">
        <label htmlFor="print-filename" className="form-label">PDF Filename</label>
        <input
          type="text"
          className="form-control"
          id="print-filename"
          placeholder="Filename without extension"
          value={value.filename}
          onChange={e => onChange('filename', e)}
        />
      </div>
      <div className="col-2">
        <label htmlFor="print-cutter-helper" className="form-label">Cutter Helper</label>
        <select
          className="form-control"
          id="print-cutter-helper"
          value={String(value.cuttingHelper)}
          onChange={e => onChangeBool('cuttingHelper', e.target.value === 'true')}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    </>
  );
}
