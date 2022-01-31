import React, {
  useCallback, useLayoutEffect, useRef, useState,
} from 'react';
import { jsPDF } from 'jspdf';

import CheckCanvas, {
  CheckCanvasRef, CheckInfo, CHECK_ORIGINAL_HEIGHT, CHECK_ORIGINAL_WIDTH,
} from './CheckCanvas';
import './PrintSettings.css';
import { usePrevious } from './utils';

type ExportMode = 'preview' | 'download';

const PAPER_CHECK_WIDTH_INCH = 8;
const PAPER_CHECK_HEIGHT_INCH = (PAPER_CHECK_WIDTH_INCH * CHECK_ORIGINAL_HEIGHT)
  / CHECK_ORIGINAL_WIDTH;

interface ExportSettings {
  paperType: string;
  dpi: number;
  cuttingHelper: boolean;
  filename: string;
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
    dpi: 300,
    cuttingHelper: true,
    filename: '',
  });

  const checkRendererRef = useRef<CheckCanvasRef>();

  const exportPDF = useCallback((mode: ExportMode) => {
    setExportScale((PAPER_CHECK_WIDTH_INCH * printSettings.dpi) / CHECK_ORIGINAL_WIDTH);
    setExportMode(mode);
    setExportRenderOptions({ ...renderOptions });
  }, [printSettings.dpi, renderOptions]);

  useLayoutEffect(() => {
    if (previousERO !== exportRenderOptions) {
      setTimeout(() => {
        const checkRef = checkRendererRef.current;
        if (checkRef != null) {
          const { canvas } = checkRef;
          // eslint-disable-next-line new-cap
          const doc = new jsPDF('p', 'in', [8.5, 11]);

          doc.addImage(canvas, 'png', 0.25, 0.5, PAPER_CHECK_WIDTH_INCH, PAPER_CHECK_HEIGHT_INCH);
          if (printSettings.cuttingHelper) {
            doc.setLineDashPattern([0.1], 2);
            doc.setLineWidth(0.01);
            doc.line(0, 0.5, 8.5, 0.5);
            doc.line(0, 3.61, 8.5, 3.61);
            doc.line(0.25, 0, 0.25, 11);
            doc.line(8.5 - 0.25, 0, 8.5 - 0.25, 11);
          }

          const exportFilename = printSettings.filename.length > 0
            ? printSettings.filename
            : `Check_de_Go_${(new Date()).getTime()}.pdf`;

          if (exportMode === 'preview') {
            doc.output('dataurlnewwindow');
          } else {
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
            Preview / Print PDF
          </button>
          <button
            className="btn btn-secondary btn-lg"
            type="button"
            onClick={() => exportPDF('download')}
          >
            Download PDF
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
      <div className="col-5">
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
      <div className="col-3">
        <label htmlFor="print-cutter-helper" className="form-label">Cutter Helper Line</label>
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
