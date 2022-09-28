import { plainToClass, Exclude, Expose} from 'class-transformer';

export class BubbleConfig {
    public height?: string = '2em';
    public width?: string = '2em';
    public lineHeight?: string = '2em';
    public readonly verticalAlign?: string = 'middle';
    public readonly textAlign?: string = 'center';
    public fontWeight?: string = 'bold';
    public readonly borderRadius?: string = '50%';
    public backgroundColor?: string = 'rgba(127, 127, 127, .7)';
    public color?: string = '#000';
    public trucumuche?: 'Portnawak';


  public desserlialize(config: any): BubbleConfig{
    //Object.assign(this, config); // ca permet de faire ca 'this = config' !
    return plainToClass(BubbleConfig, config);
    //return this;
  }

}
