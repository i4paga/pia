import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalsService } from 'app/modals/modals.service';
import { StructureService } from 'app/services/structure.service';

@Component({
  selector: `.app-list-item`,
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() structure: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public _structureService: StructureService,
              private _modalsService: ModalsService) { }

  ngOnInit() {
  }

  /**
   * Focuses out field and update Structure.
   * @param {string} attribute - Attribute of the Structure.
   * @param {*} event - Any Event.
   * @memberof ListItemComponent
   */
  onFocusOut(attribute: string, event: any) {
    const text = event.target.innerText;
    this.structure[attribute] = text;
    this.structure.update();
  }

  /**
   * Opens the modal to confirm deletion of a Structure
   * @param {string} id - The Structure id.
   * @memberof ListItemComponent
   */
  remove(id: string) {
    localStorage.setItem('structure-id', id);
    this._modalsService.openModal('modal-remove-structure');
  }

  /**
   * Export the Structure
   * @param {number} id - The Structure id.
   * @memberof ListItemComponent
   */
  export(id: number) {
    this._structureService.exportStructure(id);
  }
}