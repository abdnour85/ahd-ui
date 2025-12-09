import { Injectable } from '@angular/core';
import { StageStatus as StageStatus, StageStatuses } from '../models/MissionStage';

@Injectable({
  providedIn: 'root',
})
export class StageStatusService {
  private stageStatuses: StageStatuses[] = [
    { stage_id: '604C9FF8-C962-464E-AFEE-3E513FC6E6D2', statuses: [{ id: 'w', name: 'في الانتظار' }, { id: 'i', name: 'قيد التنفيذ' }, { id: 'c', name: 'منفذ' }] },
    { stage_id: '50AB1C5D-1545-4557-82CF-F78A3BD597CA', statuses: [{ id: 'w', name: 'في الانتظار' }, { id: 'i', name: 'قيد التنفيذ' }, { id: 'c', name: 'منفذ' }] },
    { stage_id: 'BD9BB762-4ECA-404D-ADCE-CE9BECC9FAE6', statuses: [{ id: 'w', name: 'في الانتظار' }, { id: 'i', name: 'قيد التنفيذ' }, { id: 'c', name: 'منفذ' }] },
    {
      stage_id: 'F82E4F88-E8CC-496E-8AE5-51CC47759FEA', statuses: [{ id: 'w', name: 'في الانتظار' }, { id: 'n', name: 'جديد' }, { id: 's', name: 'عالق' },
      { id: 'p', name: 'غير منسب' }, { id: 'i', name: 'قيد التنفيذ' }, { id: 'c', name: 'منفذ' }]
    },
  ];

  getStageStatuses() {
    return this.stageStatuses;
  }

  getStatusesForStage(stage_id: string): StageStatus[] {
    const stage = this.stageStatuses.find((s) => s.stage_id === stage_id);
    return stage ? stage.statuses : [];
  }
}