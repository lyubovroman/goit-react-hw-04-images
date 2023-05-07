
import { ThreeDots } from 'react-loader-spinner';
import { LoaderContainer } from 'components/Loader/Loader.styled'


export default function Loader() {
    return (
       
            <LoaderContainer>
                <ThreeDots 
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />
            </LoaderContainer>
       
    )
}
