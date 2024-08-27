import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomColumnModel, IDocumentTypeResponse, IJuristicDocumentRequest, IJuristicDocumentResponse, RowActionEventModel } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'juristic-attach-document',
  templateUrl: './juristic-attach-document.component.html',
  styleUrl: './juristic-attach-document.component.scss'
})
export class JuristicAttachDocumentComponent implements OnInit {

  @ViewChild('inputFile', { static: false }) private inputFileEl: | ElementRef | any;
  @Input() transactionId!: string;

  @Output() nextStep = new EventEmitter<void>();
  @Output() backStep = new EventEmitter<void>();

  form: FormGroup;

  documentTypeList: IDocumentTypeResponse[] = [];
  attachDocumentList: any = [];

  public juristicDocumentColumns: CustomColumnModel[] = [
    { id: 'createdDate', name: 'วันที่ และ เวลา', label: 'วันที่ และ เวลา', prop: 'createdDate', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'docName', name: 'ชื่อเอกสาร', label: 'ชื่อเอกสาร', prop: 'docName', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'docType', name: 'ประเภทเอกสาร', label: 'ประเภทเอกสาร', prop: 'docType', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'fileName', name: 'ไฟล์เอกสาร', label: 'ไฟล์เอกสาร', prop: 'fileName', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'setting', name: 'ตั้งค่า', label: 'ตั้งค่า', prop: '', sortable: false, resizeable: true, width: 80, minWidth: 80, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'close', iconName: 'close', size: 'l', color: '#2255CE' } }
  ];
  public collectionSize: number = 0;

  juristicDocumentList: IJuristicDocumentResponse[] = [];
  public limitRow: number = 5;
  public pages: number = 1;
  rowLimit: number = 5;

  constructor(
    private formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService
  ) {
    this.form = this.formBuilder.group({
      // attachDocument: new FormArray([])
      documentName: new FormControl(undefined, Validators.required),
      documentType: new FormControl(undefined, Validators.required),
      file: new FormControl(undefined, Validators.required),
    });
  }

  ngOnInit(): void {
    this.getDocumentTypes();
  }

  // onAddAttachDocument() {
  //   (this.form.get('attachDocument') as FormArray).push(
  //     this.formBuilder.group({
  //       title: new FormControl(undefined, Validators.required),
  //     })
  //   );
  // }

  onUploadDocument() {
    this.postSaveJuristicDocument();
  }

  onSubmit() {
    this.nextStep.emit();
  }

  onBack() {
    this.backStep.emit();
  }

  fileTypeValidation(event: any) {
    let files = event.target.files[0];
    this.form.get('file')?.setValue(files);
    console.log("[fileTypeValidation] files => ", files);
    console.log("[fileTypeValidation] attachDocument => ", this.form.get('file')?.value);
    this.inputFileEl.nativeElement.value = null;
  }

  getDocumentTypes() {
    this.restApiService.getBackOfficeWithModel<IDocumentTypeResponse[]>(`master-data/document-types`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.documentTypeList = res.data;
        }
      },
      error: (error) => {
        this.modalDialogService.handleError(error);
      },
    })
  }

  postSaveJuristicDocument() {
    const docTypeCode = this.form.get('documentType')?.value.key;
    const docType = this.form.get('documentType')?.value.name;
    const formData: FormData = new FormData();
    formData.append('file', this.form.get('file')?.value);
    formData.append('docName', this.form.get('documentName')?.value);
    formData.append('docTypeCode', docTypeCode);
    formData.append('docType', docType);
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeFileFormDataWithModel<IJuristicDocumentRequest, IJuristicDocumentResponse[]>(`onboarding/${this.transactionId}/document`, formData).subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        if (res.errorMessage === "Success") {
          this.juristicDocumentList = res.data;
          this.collectionSize = this.juristicDocumentList.length;
        }
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  onChangePage(event: number) {
    this.pages = event;
  }

  onAction(event: RowActionEventModel) {
    console.log("[onAction] event => ", event);
  }

}
