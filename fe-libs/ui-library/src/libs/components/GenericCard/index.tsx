import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    CardProps,
  } from "@mui/material";
  
  // Extending MUI card props to add our custom props
  export interface IGenericCard extends CardProps {
    title: string;
    subtitle?: string;
    imageUrl?: string;
    imageTitle?: string;
    children: React.ReactNode;
  }
  
  const GenericCard = (props: IGenericCard): JSX.Element => {
    const { ref, title, subtitle, imageUrl, imageTitle, children, ...otherProps } = props;
    return (
      <Card {...otherProps} ref={ref}>
        <CardHeader title={title} subheader={subtitle} />
        {imageUrl && (
          <CardMedia component="img" image={imageUrl} alt={imageTitle} />
        )}
        <CardContent>{children}</CardContent>
      </Card>
    );
  };
  
  export default GenericCard;
  