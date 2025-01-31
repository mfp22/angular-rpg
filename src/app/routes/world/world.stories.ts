import { AfterViewInit, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import * as Immutable from 'immutable';
import { IPoint } from '../../../game/pow-core';
import { AppState } from '../../app.model';
import { LoadingService } from '../../components/loading';
import { EntityAddBeingAction } from '../../models/entity/entity.actions';
import {
  GameStateNewAction,
  GameStateTravelAction,
} from '../../models/game-state/game-state.actions';
import { GameState } from '../../models/game-state/game-state.model';
import { Warrior } from '../../models/mechanics.mock';

@Component({
  selector: 'world-story-wrapper',
  template: `<loading></loading><world [debug]="debug"></world>`,
})
class Wrapper implements AfterViewInit {
  constructor(public store: Store<AppState>, public loadingService: LoadingService) {}
  @Input() debug: boolean;
  @Input() location: string = 'town';
  @Input() position: IPoint = { x: 12, y: 8 };
  ngAfterViewInit(): void {
    const warrior = new Warrior();
    const initialState: GameState = {
      party: Immutable.List<string>([warrior.eid]),
      inventory: Immutable.List<string>(),
      battleCounter: 0,
      keyData: Immutable.Map<string, any>(),
      gold: 100,
      combatZone: '',
      location: this.location,
      position: this.position,
      boardedShip: false,
      shipPosition: { x: -10, y: -10 },
    };
    this.store.dispatch(new GameStateNewAction(initialState));
    this.store.dispatch(new EntityAddBeingAction(warrior));
    this.store.dispatch(new GameStateTravelAction(initialState));
    this.loadingService.loading = false;
  }
}

export default {
  title: 'World/World Component',
  component: Wrapper,
  decorators: [moduleMetadata({ declarations: [Wrapper] })],
  argTypes: {
    debug: { type: 'boolean' },
  },
} as Meta;

const Template: Story<any> = (args: Partial<any>) => ({
  component: Wrapper,
  props: { ...args },
});

export const Castle = Template.bind({});
Castle.args = { location: 'castle' };

export const Crypt = Template.bind({});
Crypt.args = { location: 'crypt', position: { x: 5, y: 30 } };

export const Isle = Template.bind({});
Isle.args = { location: 'isle' };

export const Keep = Template.bind({});
Keep.args = { location: 'keep' };

export const Ruins = Template.bind({});
Ruins.args = { location: 'ruins' };

export const Sewer = Template.bind({});
Sewer.args = { location: 'sewer', position: { x: 21, y: 1 } };

export const TowerFloorOne = Template.bind({});
TowerFloorOne.args = { location: 'tower1', position: { x: 6, y: 8 } };

export const TowerFloorTwo = Template.bind({});
TowerFloorTwo.args = { location: 'tower2', position: { x: 7, y: 8 } };

export const TowerFloorThree = Template.bind({});
TowerFloorThree.args = { location: 'tower3', position: { x: 8, y: 8 } };

export const Town = Template.bind({});
Town.args = { location: 'town' };

export const Village = Template.bind({});
Village.args = { location: 'village' };

export const Wilderness = Template.bind({});
Wilderness.args = { location: 'wilderness' };

export const FortressOne = Template.bind({});
FortressOne.args = { location: 'fortress1' };

export const FortressTwo = Template.bind({});
FortressTwo.args = { location: 'fortress2' };
