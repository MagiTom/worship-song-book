import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-transposer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIcon, MatButtonModule],
  templateUrl: './transposer.component.html',
  styleUrl: './transposer.component.scss'
})
export class TransposerComponent {
 @Output() getCount = new EventEmitter<number>();
 @Input() value = 0;
count = signal(this.value);
decrease() {
  this.count.update(value => this.value + 1);
  this.getCount.emit(this.count())
}
increase() {
  this.count.update(value => this.value - 1);
  this.getCount.emit(this.count())
}

}
