import { Component, inject, OnInit } from '@angular/core';
import { Mission } from '../../models/Mission';
import { MissionAdjustment } from '../../models/MissionAdjustment';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MissionAdjustmentService } from '../../services/mission-adjustment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MissionServiceContract } from '../../models/MissionServiceContract';

@Component({
  selector: 'app-missions-adjustments-save',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './adjustments-save.component.html',
  styleUrl: './adjustments-save.component.scss'
})
export class MissionsAdjustmentsSaveComponent implements OnInit {
  toastr = inject(ToastrService)
  mission: Mission = {
    stockInvoice: {
      type: '',
      items: []
    },
    contracts: [],
    stages: []
  };

  constructor(
    private route: ActivatedRoute,
    private adjustmentService: MissionAdjustmentService
  ) { }

  ngOnInit(): void {
    const missionId = this.route.snapshot.paramMap.get('id');
    if (missionId) {
      this.getMissionById(missionId);
    }
  }

  getMissionById(id: string) {
    this.adjustmentService.getMissionById(id).subscribe((mission) => {
      this.mission = mission;
      // Calculate mission-level totals from contracts
      this.calculateMissionTotals();
    });
  }

  calculateMissionTotals() {
    if (this.mission.contracts) {
      this.mission.additions = this.mission.contracts.reduce((sum, contract) => 
        sum + (contract.additions || 0), 0);
      this.mission.deductions = this.mission.contracts.reduce((sum, contract) => 
        sum + (contract.deductions || 0), 0);
      this.mission.total = (this.mission.price || 0) + (this.mission.additions || 0) - (this.mission.deductions || 0);
    }
  }

  getContractAdditions(contractId: string): MissionAdjustment[] {
    const contract = this.mission.contracts.find(c => c.id === contractId);
    return contract?.adjustments?.filter(a => a.type === 'Addition') || [];
  }

  getContractDeductions(contractId: string): MissionAdjustment[] {
    const contract = this.mission.contracts.find(c => c.id === contractId);
    return contract?.adjustments?.filter(a => a.type === 'Deduction') || [];
  }

  add(type: 'Addition' | 'Deduction', contractId: string): void {
    const contract = this.mission.contracts.find(c => c.id === contractId);
    if (!contract) return;

    if (!contract.adjustments) {
      contract.adjustments = [];
    }

    const newAdjustment: MissionAdjustment = {
      id: 0, // 0 for new (not persisted)
      missionServiceContractId: contractId,
      effectiveDate: new Date().toISOString().substring(0, 10),
      amount: 0,
      type: type,
      notes: ''
    };

    contract.adjustments.push(newAdjustment);
    this.sumContractAdjustments(contract);
  }

  remove(item: MissionAdjustment, index: number, contractId: string): void {
    const contract = this.mission.contracts.find(c => c.id === contractId);
    if (!contract || !contract.adjustments) return;

    const confirmDelete = confirm('حذف العنصر المحدد؟');

    if (confirmDelete) {
      const finalizeRemoval = () => {
        contract.adjustments!.splice(index, 1);
        this.sumContractAdjustments(contract);
        this.calculateMissionTotals();
      };

      if (item.id !== 0) {
        this.adjustmentService.delete(item.id).subscribe(() => {
          finalizeRemoval();
        });
      } else {
        finalizeRemoval();
      }
    }
  }

  saveAll(): void {
    const allAdjustments: MissionAdjustment[] = [];
    
    this.mission.contracts.forEach(contract => {
      if (contract.adjustments) {
        allAdjustments.push(...contract.adjustments.filter(a => a.amount !== null && a.effectiveDate));
      }
    });

    this.adjustmentService.updateBulk(allAdjustments).subscribe({
      next: () => {
        this.toastr.success('تم تحديث الإضافات', 'تمت العملية');
        this.getMissionById(this.mission.id!);
      },
      error: err => this.toastr.error(`حدث خطأ أثناء الحفظ ${err.message}`, 'خطأ')
    });
  }

  sumContractAdjustments(contract: MissionServiceContract) {
    if (!contract.adjustments) return;

    contract.additions = contract.adjustments
      .filter(a => a.type === 'Addition')
      .reduce((sum, item) => sum + Number(item.amount), 0);

    contract.deductions = contract.adjustments
      .filter(a => a.type === 'Deduction')
      .reduce((sum, item) => sum + Number(item.amount), 0);

    contract.total = (contract.price || 0) + (contract.additions || 0) - (contract.deductions || 0);
    
    this.calculateMissionTotals();
  }

  onAdjustmentChange(contract: MissionServiceContract) {
    this.sumContractAdjustments(contract);
  }
}